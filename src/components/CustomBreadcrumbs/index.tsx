import React from 'react';
import {Link, withRouter} from "react-router";
import {IWithRouter} from "../../types";
import styles from './styles.module.scss';
import useBreadcrumbs, {BreadcrumbComponentProps} from "./useBreadcrumbs";

type Props = {};

const DynamicUserBreadcrumb = ({ match }: BreadcrumbComponentProps) => <span>{match.params.slug?.toLocaleUpperCase()}</span>;


const CustomPropsBreadcrumb = ({match}: any) => {
    return (
        <span>
            {`Event by ${match.params?.eventId}`}
        </span>
    );
};

const CustomBreadcrumbs:React.FC<Props & IWithRouter> = ({location, router}) => {
    const routerConfig = [
        {
            breadcrumb: 'Home',
            path: "/sports",
            children: [
                        {
                            path: '/sports/:slug',
                            breadcrumb: DynamicUserBreadcrumb,
                            children: [
                                { path: '/sports/:slug/event/:eventId', breadcrumb: CustomPropsBreadcrumb, props: {location} },
                                {
                                    path: `/sports/:slug/competition/:tournament`,
                                    breadcrumb: "Competition",
                                },
                                {
                                    path: `/sports/:slug/coupon/:couponId`,
                                    breadcrumb: 'Coupon Page',
                                }]
                        }
                    ]
        },
    ];

    const customBreadcrumbs = useBreadcrumbs(location, routerConfig, { disableDefaults: true, excludePaths: ['/sports'] });

    const goBack = () => router.goBack();

    const goHome = () => router.push('/');

    return (
        <div className={styles.mainBreadcrumbContainer}>
            <div className={styles.homeBlock}>
                {!['/', '/sports'].includes(location.pathname) && <p onClick={goBack}>&#8678;</p>}
                <p onClick={goHome}>&#127968;</p>
            </div>
            {customBreadcrumbs.map(({breadcrumb, match}) => {
                return (
                    <Link to={{
                        pathname: match.pathname,
                         state: {
                            tab: location.query?.tab ?? null
                         }
                    }} key={match.pathname}>
                        {breadcrumb}
                    </Link>)
            })}
        </div>
    );
}

export default withRouter(CustomBreadcrumbs);
