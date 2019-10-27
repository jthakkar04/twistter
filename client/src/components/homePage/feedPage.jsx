// Dependencies
import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export class FeedPage extends React.Component {

    // Set state so it can be redirected if not logged in
    state = {
        redirectToReferrer: false
    }

    render() {

        return (
            <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
            >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="Feed">
                <NavItem eventKey="Feed">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Feed
                    </NavText>
                </NavItem>
                <NavItem eventKey="Profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>
                </NavItem>
                <NavItem eventKey="Settings">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Settings
                    </NavText>
                </NavItem>
            </SideNav.Nav>
            </SideNav>
        );
    }
}
