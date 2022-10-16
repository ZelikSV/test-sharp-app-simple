import React from 'react';
import {IWithRouter} from "../../types";
import {Link, withRouter} from "react-router";
import useReactRouterBreadcrumbs from "../../helpers";

import './styles.css';
import {SPECIFIC_SPORT_BASE_PATH} from "../../pages/router";

const Breadcrumbs:React.FC<IWithRouter<{slug: string}>> = (props) => {
    const routes = [
        {
                    path: SPECIFIC_SPORT_BASE_PATH,
                    children: [
                        {
                            path: `${SPECIFIC_SPORT_BASE_PATH}/event/:eventId`,
                        },
                        {
                            path: `${SPECIFIC_SPORT_BASE_PATH}/competition/:tournament`,
                        },
                        {
                            path: `${SPECIFIC_SPORT_BASE_PATH}/coupon/:couponId`,
                        },
                    ]
                }
    ]

const a = useReactRouterBreadcrumbs(props.location, routes);

    return (
        <div className='breadCrumbsContainer'>
            <h4>BREADCRUMBS FROM LIBRARY</h4>
            {a.map(el => <Link className='breadCrumbsItem' to={el.key}>{el.breadcrumb}</Link>)}
        </div>
    );
}

export default withRouter(Breadcrumbs);
