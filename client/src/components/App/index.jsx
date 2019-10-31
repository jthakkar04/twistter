// Standard dependencies
import React from 'react';
import {HashRouter as Router, Route } from "react-router-dom";
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
          <Navigation authUser={this.state.authUser} />
          
          <hr />

          <Route exact path={Routes.LANDING} component={FeedPage} />
          <Route path={Routes.LOGIN} component={LoginPage} />
          <Route path={Routes.REGISTER} component={RegistrationPage} />
          {/* <Route path={Routes.TEST} component={TestPage} /> */}
          <Route path={Routes.PASSWORD_FORGET} component={ForgotPasswordPage} />
          <Route path={Routes.FEED} component={FeedPage} />
        </Router>
    </AuthUserContext.Provider>
    );
  }
}

export default withFirebase(App);

