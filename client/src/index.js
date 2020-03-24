import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import LoginPage from './components/LoginPage'
import RegistrationPage from './components/RegistrationPage'
// import PrivateRoute from './components/'
import NotFound from './components/NotFound'

import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

const Root = () => (
    <Router>
        <Switch>
            {/* <PrivateRoute exact path='/' component={App} /> */}
            <Route exact path='/' component={LoginPage} />
            <Route path='/register' component={RegistrationPage} />
            <Route path='/dashboard/:username' component={App} />
            {/* <Redirect from="*" to="/" /> */}
            <Route component={NotFound} />
        </Switch>
    </Router>
)
  
ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
