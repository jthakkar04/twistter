import React from 'react';
import { withFirebase } from '../Firebase';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

const SignOutBase = ({ firebase }) => (
  <button onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutBase);