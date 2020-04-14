import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
import AddAdPage from './components/pages/AddAdPage';
import ListAdPage from './components/pages/ListAdPage';
import NotFound from './components/pages/NotFound'
// ROUTES
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
//
import AuthApi from './services/authApi';
import * as serviceWorker from './serviceWorker';


AuthApi.setup()

const PrivateRoute = ({path, isAuthenticated, component}) => {
    return isAuthenticated ? (<Route path={path} component={component} />
        ) : (
        <Redirect to="/login" />
        )
}

const Root = () => {

    const [isConnected, setIsConnected] = useState(AuthApi.isAuthenticated());

    const HeaderWithRouter = withRouter(Header);

    return (
        <Router>
            <HeaderWithRouter isConnected={isConnected} onLogout={setIsConnected} />
                <Switch>
                    <Route exact path='/' component={IndexPage} />
                    <Route  path='/login'
                            render={(props) => 
                            <LoginPage 
                                onLogin={setIsConnected}
                                {...props}
                            />} 
                    />
                    <Route 
                        path='/register' 
                        component={RegistrationPage} 
                    />
                    <Route
                        path='/dashboard'
                        component={DashboardPage} 
                    />
                    <PrivateRoute 
                        path='/mon-espace' 
                        isAuthenticated={isConnected}
                        component={MySpacePage} 
                    />
                    <Route 
                        path='/calendrier-des-saisons'
                        component={CalendarPage} 
                    />
                    <PrivateRoute
                        path="/ajouter-annonce"
                        isAuthenticated={isConnected}
                        component={AddAdPage}
                    />
                    <Route
                        path="/liste-annonces"
                        component={ListAdPage}
                    />
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
