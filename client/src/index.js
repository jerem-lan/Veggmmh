import React from 'react';
import ReactDOM from 'react-dom';
// STYLE
import './styles/App.css';
// PAGES COMPONENTS
import IndexPage from './components/pages/IndexPage'
import LoginPage from './components/pages/LoginPage'
import RegistrationPage from './components/pages/RegistrationPage'
import DashboardPage from './components/pages/DashboardPage';
import DashboardFavPage from './components/pages/DashboardFavPage';
import CalendarPage from './components/pages/CalendarPage';
import NotFound from './components/pages/NotFound'
// ROUTES
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//
//import AuthApi from '../../services/authApi';
import * as serviceWorker from './serviceWorker';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={IndexPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegistrationPage} />
            <Route path='/dashboard/' component={DashboardPage} />
            <Route path='/mon-espace/' component={DashboardFavPage} />
            <Route path='/calendrier-des-saisons/' component={CalendarPage} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)
  
ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
