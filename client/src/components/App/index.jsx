// Standard dependencies
import React from 'react';
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "../../styles/style.scss";

// Context based dependencies
import Navigation from '../Navigation';
import Sidebar from '../Navigation/Sidebar';
import { withFirebase } from "../Firebase"
import { AuthUserContext } from '../SessionHandler';
import { withAuthentication } from '../Session'
import * as Routes from '../../constants/app_routing';

// Add all components below this page for routing
import { LoginPage } from '../login';
import { RegistrationPage } from '../registration';
import { TestPage } from '../testPage';
import { ForgotPasswordPage } from '../forgotPassword';
import { FeedPage } from '../homePage';
import { ProfilePage } from '../profilePage';

const DefaultContainer = () => (
    <div>
      {/* <Sidebar /> */}
      <Route path="/testPage" component={TestPage} />
      <Route path="/feed" component={FeedPage} />
      <Route path="/profile" component={ProfilePage} />
    </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props = {
      authUser: null
    }
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
    // let navHeader = this.props.firebase.doGetCurrentUser() ? <Sidebar /> : '';
    return (
      // <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
        <Navigation />
          {/* <Route render={({ location, history }) => ( */}
              {/* <React.Fragment>
                  <Switch> */}
                      <Route exact path="/" component={LoginPage} />
                      <Route exact path="/login" component={LoginPage} />
                      <Route path="/register" component={RegistrationPage} />
                      <Route path="/forgot" component={ForgotPasswordPage} />
                      <Route path="/register" component={RegistrationPage} />
                      
                      {/* <Route component = {DefaultContainer} /> */}
                      {/* {this.componentDidMount() ? <Sidebar /> : ''} */}
                      {/* {this.componentDidMount() ? <Route component = {DefaultContainer} /> : ''} */}
                      <Route path="/testPage" component={TestPage} />
                      <Route path="/feed" component={FeedPage} />
                      <Route path="/profile" component={ProfilePage} />
                  {/* </Switch>
                </React.Fragment> */}
          {/* )}/> */}
        </Router>
    // </AuthUserContext.Provider>
    );
  }
}

export default withAuthentication(App);

