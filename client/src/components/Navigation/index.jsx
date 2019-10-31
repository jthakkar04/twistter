import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/app_routing';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);
const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing(test)</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Feed</Link>
    </li>
    <li>
      <Link to={ROUTES.TEST}>TEST</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LOGIN}>Login</Link>
    </li>
    <li>
      <Link to={ROUTES.REGISTER}>Sign Up</Link>
    </li>
  </ul>
);

export default Navigation;