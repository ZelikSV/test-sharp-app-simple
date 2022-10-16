import React, {ReactElement} from 'react';
import {IWithRouter} from "../../types";
import './styles.css';
import SportTabs from "./SportTabs";
import sportsTabs from "../../mock/sportsTabs";
import TabComponent from "../../components/TabComponent";

type ISpecificSportPageProps = IWithRouter<{slug: string}, {tab?: string}>;

const SpecificSportPage: React.FC<ISpecificSportPageProps> = ({params, location}) => {
    // @ts-ignore
    const tabs: Array<{name: string}> = sportsTabs[params.slug];

    const tabQuery = location.query.tab ?? tabs[0].name;


    const tabComponent: Record<string, ReactElement> = {
        feature: <TabComponent />,
        matches: <TabComponent />,
        competitions: <TabComponent />,
        coupons: <TabComponent />
    };

    return (
        <div className="specificSportPageContent">
            {/* @ts-ignore */}
            <SportTabs tabs={tabs} />
            {tabComponent[tabQuery] ?? null}
        </div>
    );
}

export default SpecificSportPage;
