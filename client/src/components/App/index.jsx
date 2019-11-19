// Standard dependencies
import React from 'react';
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "../../styles/style.scss";

// Context based dependencies
import Navigation from '../Navigation';
import { withFirebase } from "../Firebase"
import { AuthUserContext } from '../SessionHandler';
import * as Routes from '../../constants/app_routing';

// Add all components below this page for routing
import SignOutButton from '../SignOut';
import { LoginPage } from '../login';
import { RegistrationPage } from '../registration';
import { TestPage } from '../testPage';
import { ForgotPasswordPage } from '../forgotPassword';
import { FeedPage } from '../homePage';
import { ProfilePage } from '../profilePage';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.props = {
            currentUser: null
        }

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
        });
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
                <Router>
                    <Navigation authUser={this.state.authUser} />
                    {/* <SignOutButton /> */}

                    <Route exact path={Routes.LANDING} component={LoginPage} />
                    <Route path={Routes.LOGIN} component={LoginPage} />
                    <Route path={Routes.REGISTER} component={RegistrationPage} />
                    <Route path={Routes.TEST} component={TestPage} />
                    <Route path={Routes.PASSWORD_FORGET} component={ForgotPasswordPage} />
                    <Route path={Routes.FEED} component={FeedPage} />
                    <Route path={Routes.PROFILE} component={ProfilePage} />
                </Router>
            </AuthUserContext.Provider >
        );
    }
}

export default withFirebase(App);

