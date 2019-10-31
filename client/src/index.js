import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from "react-router-dom";

// Add all components below this page for routing
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

// const routing = (
//     <Router>
//         < App />
//     </Router>
// )
// ReactDOM.render(routing, document.getElementById("root"));

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
     document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
