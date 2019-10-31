import React from 'react';
import {HashRouter as Router, Route } from "react-router-dom";
import Navigation from '../Navigation';
import "../../styles/style.scss";

// Add all components below this page for routing
import { Login } from '../login';
import { RegistrationPage } from '../registration';
import { TestPage } from '../testPage';
import { Forgot } from '../forgotPassword';

const App = () => (
  <Router>
  <Navigation />
  <hr />
  <Route exact path="/" component={TestPage} />
  <Route path="/login" component={Login} />
  <Route path="/register" component={RegistrationPage} />
  {/* <Route path="/testPage" component={TestPage} /> */}
  <Route path="/forgot" component={Forgot} />
</Router>
);
export default App;



// WILL BE ANIHILATED LATER TONIGHT
// export class App extends React.Component {


//   render() {
//     // if (!firebase.apps.length) {
//     //   firebase.initializeApp(firebaseConfig);
//     // }

//     return (
//       <Router>
//           <Navigation />
//          {/* <Switch>
//            <Route exact path="/" component={Login} />
//            <Route path="/login" component={Login} />
//            <Route path="/register" component={Registration} />
//            <Route path="/testPage" component={TestPage} />
//            <Route path="/forgot" component={Forgot} />
//          </Switch> */}

//       </Router>

//     );
//   }
// }


