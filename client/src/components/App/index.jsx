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
import { LoginPage } from '../login';
import { RegistrationPage } from '../registration';
import { TestPage } from '../testPage';
import { ForgotPasswordPage } from '../forgotPassword';
import { FeedPage } from '../homePage';


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
<Route render={({ location, history }) => (
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route path="/register" component={RegistrationPage} />
                    <Route path="/forgot" component={ForgotPasswordPage} />
                    <Route path="/register" component={RegistrationPage} />
                    <Route path="/testPage" component={TestPage} />
                    <Route path="/feed" component={FeedPage} />
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
                    <NavItem eventKey="Login">
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
                {/* { <Route path="/" exact component={props => <RootComponent />} />
                <Route path="/login" component={props => <Login />} />
                <Route path="/feed" component={props => <Feed />} />
                <Route path="/settings" component={props => <Settings />} />
                } */}
            </main>
         </React.Fragment>
            )}/>
        {/* <Router>
          <Navigation authUser={this.state.authUser} />
          
          <hr />

          <Route exact path={Routes.LANDING} component={FeedPage} />
          <Route path={Routes.LOGIN} component={LoginPage} />
          <Route path={Routes.REGISTER} component={RegistrationPage} />
          <Route path={Routes.TEST} component={TestPage} />
          <Route path={Routes.PASSWORD_FORGET} component={ForgotPasswordPage} />
          <Route path={Routes.FEED} component={FeedPage} />
        </Router> */}
        </Router>
    </AuthUserContext.Provider>
    );
  }
}

export default withFirebase(App);

