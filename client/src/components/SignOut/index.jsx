import React from 'react';
import { withFirebase } from '../Firebase';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

const SignOutBase = ({ firebase }) => (
  <NavText onClick={firebase.doSignOut}>
    Sign Out
  </NavText>
);

export default withFirebase(SignOutBase);