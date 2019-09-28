import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route } from "react-router-dom";

// Add all components below this page for routing
import App from './App.jsx';
import { Login } from './components/login';
import { Registration } from './components/registration';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
