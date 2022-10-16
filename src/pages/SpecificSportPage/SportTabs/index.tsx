import React from 'react';
import {browserHistory, withRouter} from "react-router";

import './styles.css';
import {IWithRouter} from "../../../types";

type ISportTabsProps = { tabs: Array<{name: string}> } & IWithRouter;

const SportTabs:React.FC<ISportTabsProps> = ({tabs, location}: ISportTabsProps) => {
    const tabQuery = location.query.tab ?? tabs[0].name;

    const handleRedirect = (tab: string) => () => {
        browserHistory.replace(`${location.pathname}?tab=${tab}`);
    }

    return (
        <div className="tabs">
            {tabs.map(tab => {
                return (<li key={tab.name} className={tabQuery === tab.name ? 'selectedTab' : ''} onClick={handleRedirect(tab.name)}>{tab.name}</li>)
            })}
        </div>
    );
}

export default withRouter(SportTabs);
