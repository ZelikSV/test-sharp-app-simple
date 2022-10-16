export interface ILocation<Q = {}, S = {}> extends Location {
    query: Q;
    state?: S;
}

export interface IWithRouter<P = {}, Q = {
    tab: null | string;
}, S = {}> {
    params: P;
    location: ILocation<Q, S>;
    router: {
        push: Function;
        replace: Function;
        location: {
            pathname: string;
            query?: {
                src?: string;
            };
        };
        go(to: number): void;
        goForward(): void;
        goBack(): void;
    };
}
