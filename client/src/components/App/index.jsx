// Standard dependencies
import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "../../styles/style.scss";

// Context based dependencies
import Navigation from '../Navigation';
import { withAuthentication } from '../SessionHandler';
import * as Routes from '../../constants/app_routing';

// Add all components below this page for routing
import SignOutButton from '../SignOut';
import { LoginPage } from '../login';
import { RegistrationPage } from '../registration';
import { TestPage } from '../testPage';
import { ForgotPasswordPage } from '../forgotPassword';
import { FeedPage } from '../homePage';
import { ProfilePage } from '../profilePage';

const App = () => (
    <Router>
        <Navigation />
        <SignOutButton />

        <Route exact path={Routes.LANDING} component={LoginPage} />
        <Route path={Routes.LOGIN} component={LoginPage} />
        <Route path={Routes.REGISTER} component={RegistrationPage} />
        <Route path={Routes.TEST} component={TestPage} />
        <Route path={Routes.PASSWORD_FORGET} component={ForgotPasswordPage} />
        <Route path={Routes.FEED} component={FeedPage} />
        <Route path={Routes.PROFILE} component={ProfilePage} />
    </Router>
);

export default withAuthentication(App);;

