export interface PathPattern<Path extends string = string> {
    /**
     * A string to match against a URL pathname. May contain `:id`-style segments
     * to indicate placeholders for dynamic parameters. May also end with `/*` to
     * indicate matching the rest of the URL pathname.
     */
    path: Path;
    /**
     * Should be `true` if the static portions of the `path` should be matched in
     * the same case.
     */
    caseSensitive?: boolean;
    /**
     * Should be `true` if this pattern should match the entire URL pathname.
     */
    end?: boolean;
}

type _PathParam<Path extends string> =
// split path into individual path segments
    Path extends `${infer L}/${infer R}`
        ? _PathParam<L> | _PathParam<R>
        : // find params after `:`
        Path extends `${string}:${infer Param}`
            ? Param
            : // otherwise, there aren't any params present
            never;

export type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};

type PathParam<Path extends string> =
// check if path is just a wildcard
    Path extends "*"
        ? "*"
        : // look for wildcard at the end of the path
        Path extends `${infer Rest}/*`
            ? "*" | _PathParam<Rest>
            : // look for params in the absence of wildcards
            _PathParam<Path>;

export type ParamParseKey<Segment extends string> =
// if could not find path params, fallback to `string`
    [PathParam<Segment>] extends [never] ? string : PathParam<Segment>;

function safelyDecodeURIComponent(value: string, paramName: string) {
    try {
        return decodeURIComponent(value);
    } catch (error) {
        return value;
    }
}

function compilePath(
    path: string,
    caseSensitive = false,
    end = true
): [RegExp, string[]] {
    let paramNames: string[] = [];
    let regexpSource =
        "^" +
        path
            .replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
            .replace(/^\/*/, "/") // Make sure it has a leading /
            .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
            .replace(/:(\w+)/g, (_: string, paramName: string) => {
                paramNames.push(paramName);
                return "([^\\/]+)";
            });

    if (path.endsWith("*")) {
        paramNames.push("*");
        regexpSource +=
            path === "*" || path === "/*"
                ? "(.*)$" // Already matched the initial /, just match the rest
                : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
    } else {
        regexpSource += end
            ? "\\/*$" // When matching to the end, ignore trailing slashes
            : // Otherwise, match a word boundary or a proceeding /. The word boundary restricts
              // parent routes to matching only their own words and nothing more, e.g. parent
              // route "/home" should not match "/home2".
              // Additionally, allow paths starting with `.`, `-`, `~`, and url-encoded entities,
              // but do not consume the character in the matched path so they can match against
              // nested paths.
            "(?:(?=[@.~-]|%[0-9A-F]{2})|\\b|\\/|$)";
    }

    let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");

    return [matcher, paramNames];
}

export interface PathMatch<ParamKey extends string = string> {
    /**
     * The names and values of dynamic parameters in the URL.
     */
    params: Params<ParamKey>;
    /**
     * The portion of the URL pathname that was matched.
     */
    pathname: string;
    /**
     * The portion of the URL pathname that was matched before child routes.
     */
    pathnameBase: string;
    /**
     * The pattern that was used to match.
     */
    pattern: PathPattern;
}

type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/match-path
 */
export function matchPath<
    ParamKey extends ParamParseKey<Path>,
    Path extends string
    >(
    pattern: PathPattern<Path> | Path,
    pathname: string
): PathMatch<ParamKey> | null {
    if (typeof pattern === "string") {
        pattern = { path: pattern, caseSensitive: false, end: true };
    }

    let [matcher, paramNames] = compilePath(
        pattern.path,
        pattern.caseSensitive,
        pattern.end
    );

    let match = pathname.match(matcher);
    if (!match) return null;

    let matchedPathname = match[0];
    let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
    let captureGroups = match.slice(1);
    let params: Params = paramNames.reduce<Mutable<Params>>(
        (memo, paramName, index) => {
            // We need to compute the pathnameBase here using the raw splat value
            // instead of using params["*"] later because it will be decoded then
            if (paramName === "*") {
                let splatValue = captureGroups[index] || "";
                pathnameBase = matchedPathname
                    .slice(0, matchedPathname.length - splatValue.length)
                    .replace(/(.)\/+$/, "$1");
            }

            memo[paramName] = safelyDecodeURIComponent(
                captureGroups[index] || "",
                paramName
            );
            return memo;
        },
        {}
    );

    return {
        params,
        pathname: matchedPathname,
        pathnameBase,
        pattern,
    };
}
