import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// AUTHENTIFICATION API 
import AuthApi from './services/authApi';
// STYLE
import './styles/App.css';
// PAGES COMPONENTS
import Header from './components/Header'
import IndexPage from './components/pages/IndexPage'
import LoginPage from './components/pages/LoginPage'
import RegistrationPage from './components/pages/RegistrationPage'
import DashboardPage from './components/pages/DashboardPage';
import MySpacePage from './components/pages/MySpacePage';
import CalendarPage from './components/pages/CalendarPage';
import SeasonalItemCardPage from './components/pages/SeasonalItemCardPage';
import AddAdPage from './components/pages/AddAdPage';
import ListAdPage from './components/pages/ListAdPage';
import NotFound from './components/pages/NotFound'
// ROUTES
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

AuthApi.setup()

const Root = () => {

    const [isConnected, setIsConnected] = useState(AuthApi.isAuthenticated());

    return (
        <Router>
            <Header isConnected={isConnected} onLogout={setIsConnected} />
                <Switch>
                    <Route exact path='/' component={IndexPage} />
                    <Route  path='/login'
                            render={(props) => <LoginPage onLogin={setIsConnected}/>} 
                    />
                    <Route path='/register' component={RegistrationPage} />
                    <Route path='/dashboard/' component={DashboardPage} />
                    <Route path='/mon-espace' component={MySpacePage} />
                    <Route  path='/ajouter-annonce' 
                            render={(props) => <AddAdPage isConnected={isConnected}/>} 
                    />
                    <Route  path='/liste-annonces' 
                            render={(props) => <ListAdPage isConnected={isConnected}/>} 
                    />
                    <Route path='/calendrier-des-saisons' component={CalendarPage} />
                    <Route path='/:name' component={SeasonalItemCardPage} />

                    <Route component={NotFound} />
                </Switch>
        </Router>
    )
}
  
ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
