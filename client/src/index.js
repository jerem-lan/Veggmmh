import React from 'react';
import ReactDOM from 'react-dom';

import './styles/App.css';

import IndexPage from './components/IndexPage'
import LoginPage from './components/LoginPage'
import RegistrationPage from './components/RegistrationPage'
import DashboardPage from './components/DashboardPage';
import DashboardFavPage from './components/DashboardFavPage';
import NotFound from './components/NotFound'

import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={IndexPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegistrationPage} />
            <Route path='/dashboard/' component={DashboardPage} />
            <Route path='/mon-espace/' component={DashboardFavPage} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)
  
ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
