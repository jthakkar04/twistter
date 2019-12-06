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
import { slide as Menu } from 'react-burger-menu'
import {Link} from 'react-router-dom'

// Components
import SignOutButton from '../SignOut';

const Navigation = () => (
   // <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
   // </div>
);

const NavigationAuth = () => (

    <Router>
       <Route render={({ location, history }) => (
            //<React.Fragment>
    <Menu>
        <Link id="home" className="menu-item" to="/">Login</Link>
        <Link id="profile" className="menu-item" to="/profile">Profile</Link>
        <Link id="settings" className="menu-item" to="/settings">Settings</Link>
        <Link id="feed" className="menu-item" to="/feed">Feed</Link>
        <SignOutButton />
        
      </Menu>
          //  </React.Fragment>
        )}
        />
    </Router>
);

const NavigationNonAuth = () => (
    <Router>
        <Route render={({ location, history }) => (
            <Menu>
            <Link id="home" className="menu-item" to="/">Login</Link>
            <Link id="register" className="menu-item" to="/register">Sign-Up Now!</Link>
          </Menu>
        )}
        />
    </Router>

);


export default Navigation;