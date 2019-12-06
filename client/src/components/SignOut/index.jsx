import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutBase = ({ firebase }) => (
  <p onClick={firebase.doSignOut}>
    Logout
  </p>
);

export default withFirebase(SignOutBase);