import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../Utils';

const AuthenticatedRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default AuthenticatedRoute;