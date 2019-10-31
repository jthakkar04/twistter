import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/app_routing';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LOGIN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;