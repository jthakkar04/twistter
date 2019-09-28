import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./styles/App.scss";

class App extends React.Component {

  render() {

    return (
      <div className="App"> {/* the whole thing which is declared in app.scss*/}

        <div className="landing">
          <div className="container" >
            <h1>Welcome to Twisster!</h1>
            <Link path="/login">
              <button type="button" className="btn">
                Login
                    </button>
            </Link>
            <Link path="/register">
              <button type="button" className="btn">
                Sign-up
                    </button>
            </Link>
          </div>
        </div>
      </div >

    );
  }
}

export default App;