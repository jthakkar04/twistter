import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Login } from "./components/login/index";

class App extends React.Component {

  render() {
    return (
      <div>
      <Router>
        <Route path="/" exact component={Login} />
      </Router>
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {/* {isLogginActive && ( */}
              <Login containerRef={ref => (this.current = ref)} />
            {/* )} */}
            {/* {!isLogginActive && ( */}
              {/* <Register containerRef={ref => (this.current = ref)} /> */}
            {/* )} */}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;