import * as React from 'react';
import {trim} from 'lodash';
import {browserHistory, IndexRoute, Redirect, Route, Router} from 'react-router';
import SportPage from "./SportPage";
import EventPage from "./EventPage";
import HomePage from "./HomePage";
import SpecificSportPage from "./SpecificSportPage";
import CompetitionsPage from "./CompetitionsPage";

export const SPORTS_BASE_PATH = '/sports';
export const SPECIFIC_SPORT_BASE_PATH = `${SPORTS_BASE_PATH}/:slug`;

export function getSpecificSportPagePath(slug: string | null, relativePath?: string): string {
    const basePath = slug ? SPECIFIC_SPORT_BASE_PATH.replace(':slug', slug) : SPECIFIC_SPORT_BASE_PATH;

    return `${basePath}${relativePath ? `/${trim(relativePath, '/')}` : ''}`;
}

export default (
    <Router history={browserHistory}>
        <Route path='/sports' component={SportPage}>
            <Redirect from="/" to="/sports" />
            <IndexRoute component={HomePage} />
            <Route path={SPECIFIC_SPORT_BASE_PATH}>
                <IndexRoute component={SpecificSportPage} />
                <Route path={getSpecificSportPagePath(null, 'event/:eventId')} component={EventPage}>
                    <IndexRoute component={EventPage} />
                    <Route path={getSpecificSportPagePath(null,'event/:eventId/predicted-lineups')} component={EventPage} />
                </Route>
                <Route path={getSpecificSportPagePath(null, 'competition/:tournament')} component={CompetitionsPage} />
                <Route path={getSpecificSportPagePath(null, 'coupon/:couponId')} component={CompetitionsPage} />
            </Route>
        </Route>
    </Router>
);
