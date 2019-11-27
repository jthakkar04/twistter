import React from 'react';
import { withFirebase } from '../Firebase';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

const SignOutBase = ({ firebase }) => (
  <p onClick={firebase.doSignOut}>
    Logout
  </p>
);

export default withFirebase(SignOutBase);