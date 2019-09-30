import React from 'react';
// import { Navbar } from "react-router-dom";
import { Switch, HashRouter as Router, Route } from "react-router-dom";
// import "./styles/App.scss";

// Add all components below this page for routing
import { Login } from './components/login';
import { Registration } from './components/registration';
import { TestPage } from './components/testPage';

class App extends React.Component {

  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/testPage" component={TestPage} />
        </Switch>

      </Router>
      // <div className="App"> {/* the whole thing which is declared in app.scss*/}

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
      // </div >

    );
  }
}

export default App;