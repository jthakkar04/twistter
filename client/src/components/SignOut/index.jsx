import React from 'react';
import { withFirebase } from '../Firebase';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

const SignOutBase = ({ firebase }) => (
  <text onClick={firebase.doSignOut}>
    Logout
  </text>
);

export default withFirebase(SignOutBase);