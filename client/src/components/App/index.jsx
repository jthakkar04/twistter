// Standard dependencies
import React from 'react';
import {HashRouter as Router, Route } from "react-router-dom";
import "../../styles/style.scss";

// Context based dependencies
import Navigation from '../Navigation';
import { withFirebase } from "../Firebase"
import { AuthUserContext } from '../Session';

// Add all components below this page for routing
import { LoginPage } from '../login';
import { RegistrationPage } from '../registration';
import { TestPage } from '../testPage';
import { Forgot } from '../forgotPassword';

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
          
          <Route exact path="/" component={TestPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          {/* <Route path="/testPage" component={TestPage} /> */}
          <Route path="/forgot" component={Forgot} />
        </Router>
    </AuthUserContext.Provider>
    );
  }
}

export default withFirebase(App);

