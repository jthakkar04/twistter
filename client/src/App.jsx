import React from 'react';
import { Link } from "react-router-dom";
import "./styles/App.scss";
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFlUyTWuhN0t-e2vFq4VOtz-pu2e9Nsf4",
  authDomain: "twistter-34846.firebaseapp.com",
  databaseURL: "https://twistter-34846.firebaseio.com",
  projectId: "twistter-34846",
  storageBucket: "",
  messagingSenderId: "558905302953",
  appId: "1:558905302953:web:e6bb5284e0a8798487eeb8"
};

class App extends React.Component {
  

  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    return (
      <div className="App"> {/* the whole thing which is declared in app.scss*/}

        <div className="landing">
          <div className="container" >
            <h1>Welcome to Twistter!</h1>
            <Link to="/login">
              <button type="button" className="btn">
                Login
                    </button>
            </Link>
            <Link to="/register">
              <button type="button" className="btn">
                Sign-up
                    </button>
            </Link>
          </div>
          <div>

          </div>
        </div>
      </div >

    );
  }
}

export default App;