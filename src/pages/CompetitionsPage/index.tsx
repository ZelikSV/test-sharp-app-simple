import React from 'react';
import {IWithRouter} from "../../types";
import {getSpecificSportPagePath} from "../router";
import {Link} from "react-router";

import './styles.css';

const CompetitionsPage:React.FC<IWithRouter<{slug: string}>> = (props) => {
    return (
        <div>
            CompetitionsPage
            <div className="links">
                <Link to={{pathname: getSpecificSportPagePath(props.params.slug, 'event/1234'), state: {tab: props.location.query.tab}}}>Event 1234</Link>
                <Link to={{pathname: getSpecificSportPagePath(props.params.slug, 'event/42'), state: {tab: props.location.query.tab}}}>Event 42</Link>
                <Link to={{pathname: getSpecificSportPagePath(props.params.slug, 'event/9765'), state: {tab: props.location.query.tab}}}>Event 9765</Link>
                <Link to={{pathname: getSpecificSportPagePath(props.params.slug, 'event/342'), state: {tab: props.location.query.tab}}}>Event 342</Link>
            </div>
        </div>
    );
}

export default CompetitionsPage;
