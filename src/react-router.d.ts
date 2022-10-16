declare module 'react-router' {
    import {FC, ComponentClass} from 'react';

    type Location = any;

    function createMemoryHistory(...args: any[]): any;
    function match(...args: any[]): any;
    function withRouter<P = {}, S = {}>(...args: any[]): FC<P> & S;

    const IndexRoute: ComponentClass<any>;
    const Link: ComponentClass<any>;
    const Redirect: ComponentClass<any>;
    const Route: ComponentClass<any>;
    const Router: ComponentClass<any>;
    const RouterContext: ComponentClass<any>;

    const browserHistory: any;
}
