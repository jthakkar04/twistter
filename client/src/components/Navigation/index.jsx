import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { AuthUserContext } from '../SessionHandler';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Styles
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { GoSignIn, GoSignOut } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import "../../styles/style.scss";

// Components
import SignOutButton from '../SignOut';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (

    <Router>
        <Route render={({ location, history }) => (
            <React.Fragment>
                <SideNav
                    onSelect={(selected) => {
                        const to = '/' + selected;
                        if (location.pathname !== to) {
                            history.push(to);
                        }
                    }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="Login">
                        <NavItem eventKey="feed">
                            <NavIcon>
                                {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                            </NavIcon>
                            <NavText>
                                Feed
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="profile">
                            <NavIcon>
                                <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Profile
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="settings">
                            <NavIcon>
                                <i className="fa fa-fw fa-settings" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Settings
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="login">
                            <NavIcon>
                                <i className="fa fa-fw fa-settings" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                <SignOutButton />
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </React.Fragment>
        )}
        />
    </Router>
);

const NavigationNonAuth = () => (
    <Router>
        <Route render={({ location, history }) => (
            <React.Fragment>
                <SideNav
                    onSelect={(selected) => {
                        const to = '/' + selected;
                        if (location.pathname !== to) {
                            history.push(to);
                        }
                    }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="Login">
                        <NavItem eventKey="login">
                            <NavIcon>
                                <GoSignIn />
                            </NavIcon>
                            <NavText>
                                Login
                    </NavText>
                        </NavItem>
                        <NavItem eventKey="register">
                            <NavIcon>
                                <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Sign-Up Now!
                    </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </React.Fragment>
        )}
        />
    </Router>

);


export default Navigation;