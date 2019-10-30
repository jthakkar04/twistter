// Dependencies
import React from 'react';
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

// Be sure to include styles at some point, probably during your bootstraping

export class Feed extends React.Component {

    // Set state so it can be redirected if not logged in
    state = {
        redirectToReferrer: false
    }
    render() {
        return (
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
                    <SideNav.Nav defaultSelected="feed">
                        <NavItem eventKey="feed">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Feed
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Profile">
                            <NavIcon>
                                <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Profile
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Settings">
                            <NavIcon>
                                <i className="fa fa-fw fa-settings" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Settings
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Logout">
                            <NavIcon>
                                <i className="fa fa-fw fa-settings" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Logout
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <main>
                    {/* <Route path="/" exact component={props => <RootComponent />} /> */}
                    <Route path="/feed" component={props => <Feed />} />
                    {/* <Route path="/settings" component={props => <Settings />} /> */}
                </main>
            </React.Fragment>
            )}/>
        );
    }
}