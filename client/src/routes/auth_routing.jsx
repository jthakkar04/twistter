import React from 'react'
import { Redirect, Route } from 'react-router-dom';

// IGNORE
// Dummy Authentication for proof of concept
export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100) // fake async
    }
}

// Will redirect user back to login page if they are not logged in
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)