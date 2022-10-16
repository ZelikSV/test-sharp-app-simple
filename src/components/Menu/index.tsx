import React from 'react';
import {Link} from "react-router";

import './index.css';

interface IMenuProps {
    links: Array<{
        name: string;
        path: string;
    }>
}

const Menu: React.FC<IMenuProps> = ({links}) => {
    return (
        <ul className="menu">
            {links.map(link => (
                <li key={link.name}>
                    <Link to={link.path}>
                        {link.name}
                    </Link>
                </li>
            ))}

        </ul>
    );
}

export default Menu;
