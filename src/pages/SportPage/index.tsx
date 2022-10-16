import React, {ReactElement} from 'react';
import Menu from "../../components/Menu";
import {IWithRouter} from "../../types";
import CustomBreadcrumbs from "../../components/CustomBreadcrumbs";
import './styles.css';

type ISportPageProps = IWithRouter & {children: ReactElement | string | number};

const SportPage: React.FC<ISportPageProps> = (props) => {
    const sportsLinks = [
        {name: 'football', path: '/sports/football'},
        {name: 'hockey', path: '/sports/hockey'},
        {name: 'baseball', path: '/sports/baseball'},
        {name: 'cricket', path: '/sports/cricket'}
    ];

    return (
        <div className='mainWrapper'>
            <div className='sideBar'>
                <Menu links={sportsLinks}/>
            </div>
            <div className='content'>
                <CustomBreadcrumbs />
                {props.children}
            </div>
        </div>
    );
}

export default SportPage;
