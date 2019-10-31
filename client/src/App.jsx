import React from 'react';
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

// import "./styles/App.scss";

// Add all components below this page for routing
import { Login } from './components/login';
import { Registration } from './components/registration';
import { TestPage } from './components/testPage';
import { Forgot } from './components/forgotPassword';
import { Feed } from './components/homePage';
// import "./styles/App.scss";
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFlUyTWuhN0t-e2vFq4VOtz-pu2e9Nsf4",
  authDomain: "twistter-34846.firebaseapp.com",
  databaseURL: "https://twistter-34846.firebaseio.com",
  projectId: "twistter-34846",
  storageBucket: "",
  messagingSenderId: "558905302953",
  appId: "1:558905302953:web:e6bb5284e0a8798487eeb8"
};

class App extends React.Component {


  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    return (
    //   <Router>
    //     <Switch>
    //         <Route exact path="/" component={Login} />
    //         <Route exact path="/login" component={Login} />
    //         <Route path="/register" component={Registration} />
    //         <Route path="/forgot" component={Forgot} />
    //         <Route path="/register" component={Registration} />
    //         <Route path="/testPage" component={TestPage} />
    //         {/* <Route path="/feed" component={FeedPage} /> */}
    //     </Switch>
    //     </Router>
        <Route render={({ location, history }) => (
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                    <Route path="/forgot" component={Forgot} />
                    <Route path="/register" component={Registration} />
                    <Route path="/testPage" component={TestPage} />
                    <Route path="/feed" component={Feed} />
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
            );
        }
    }
      /* /* </Router> <div className="App"> { */
          /* /* the whole thing which is declared in app.scss

      //   <div className="landing">
      //     <div className="container" >
      //       <h1>Welcome to Twisster!</h1>
      //       <Link to="/login">
      //         <button type="button" className="btn">
      //           Login
      //               </button>
      //       </Link>
      //       <Link to="/register">
      //         <button type="button" className="btn">
      //           Sign-up
      //               </button>
      //       </Link>
      //     </div>
      //     <div>

      //     </div>
      //   </div>
      // </div > */
export default App;