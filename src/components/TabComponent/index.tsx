import React from 'react';
import {Link, withRouter} from "react-router";
import {getSpecificSportPagePath} from "../../pages/router";
import {IWithRouter} from "../../types";

import './styles.css';

type Props = IWithRouter<{slug: string}, {tab: string}>;

const TabComponent:React.FC<Props> = (props: Props) => {

    if (props.location.query.tab === 'competitions') {
        return (
            <div className="links">
                <Link to={getSpecificSportPagePath(props.params.slug, 'competition/421')}>Competitions page</Link>
                <Link to={getSpecificSportPagePath(props.params.slug, 'competition/431')}>Competitions page 2</Link>
                <Link to={getSpecificSportPagePath(props.params.slug, 'competition/534')}>Competitions page 3</Link>
            </div>
        )
    }

    return (
        <div>
            <Link to={getSpecificSportPagePath(props.params.slug, 'event/1234')}>Event 1234</Link>
        </div>
    );
}

export default withRouter(TabComponent);
