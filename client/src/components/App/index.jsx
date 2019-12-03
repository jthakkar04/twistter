// Standard dependencies
import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "../../styles/style.scss";

import logo from "../../images/sample-logo.png"

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

import styled from "@emotion/styled";
import { useTheme } from "../../ThemeContext";

const Wrapper = styled("div")`
  background: ${props => props.theme.background};
  width: 80vw;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen";
  h1 {
    color: ${props => props.theme.body};
  }
  input {
      color: ${props => props.theme.body};
  }
`;

const App = () => {
    const themeState = useTheme();
    return (

        <Router>
            <img className="logo" src={logo} />
            <Navigation />
            {/* <SignOutButton /> */}
            <Wrapper>
                {/* <h1>Dark Mode</h1> */}
                <div>
                    <button onClick={() => themeState.toggle()}>
                        {themeState.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                    <Route path={Routes.PROFILE} component={ProfilePage} />
                    <Route exact path={Routes.LANDING} component={LoginPage} />
                    <Route path={Routes.LOGIN} component={LoginPage} />
                    <Route path={Routes.REGISTER} component={RegistrationPage} />
                    <Route path={Routes.TEST} component={TestPage} />
                    <Route path={Routes.PASSWORD_FORGET} component={ForgotPasswordPage} />
                    <Route path={Routes.FEED} component={FeedPage} />
                </div>
            </Wrapper>
        </Router>
    )
};

export default withAuthentication(App);;

