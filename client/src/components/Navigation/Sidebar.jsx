import React from 'react';
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "../../styles/style.scss";

import { LoginPage } from '../login';
import { RegistrationPage } from '../registration';
import { TestPage } from '../testPage';
import { ForgotPasswordPage } from '../forgotPassword';
import { FeedPage } from '../homePage';
import { ProfilePage } from '../profilePage';

export default class Sidebar extends React.Component {
    render() {
        return (
            <Router>
            <Route render={({ location, history }) => (
                <React.Fragment>
                    <Switch>
                        <Route path="/testPage" component={TestPage} />
                        <Route path="/feed" component={FeedPage} />
                        <Route path="/profile" component={ProfilePage} />
                    </Switch>
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
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
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
                                Logout
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
             </React.Fragment>
                )}/>
            </Router>
        );
    }
}