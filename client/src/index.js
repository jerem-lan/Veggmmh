import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// AUTHENTIFICATION API 
import AuthApi from './services/authApi';
// STYLE
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
// PAGES COMPONENTS
import Header from './components/Header'
import IndexPage from './components/pages/IndexPage'
import LoginPage from './components/pages/LoginPage'
import RegistrationPage from './components/pages/RegistrationPage'
import DashboardPage from './components/pages/DashboardPage';
import CalendarPage from './components/pages/CalendarPage';
import SeasonalItemCardPage from './components/pages/SeasonalItemCardPage';
import AddAdPage from './components/pages/AddAdPage';
import ListAdPage from './components/pages/ListAdPage';
import MyRecipesPage from './components/pages/MyRecipesPage';
import MyFavRecipesPage from './components/pages/MyFavRecipesPage';
import MyAdsPage from './components/pages/MyAdsPage';
import NotFound from './components/pages/NotFound'
// ROUTES
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
//
import * as serviceWorker from './serviceWorker';
import { ToastContainer, toast } from 'react-toastify';

AuthApi.setup()

const PrivateRoute = ({path, isAuthenticated, component}) => {
    return isAuthenticated ? (<Route path={path} component={component} />) :
    (toast.info("connectez vous !!"), 
    <Redirect to="/login" />)
}

const Root = () => {

    const [isConnected, setIsConnected] = useState(AuthApi.isAuthenticated());
    const HeaderWithRouter = withRouter(Header);

    return (
        <Router>
            <HeaderWithRouter isConnected={isConnected} onLogout={setIsConnected} />
                <Switch>
                    <Route 
                        exact path='/' 
                        component={IndexPage} 
                    />
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
                    <Route 
                        path='/calendrier-des-saisons'
                        component={CalendarPage} 
                    />
                    <Route 
                        path='/calendrier-des-saisons' 
                        component={CalendarPage} 
                    />
                    <Route
                        path="/liste-annonces"
                        component={ListAdPage}
                    />
                    <PrivateRoute
                        path="/ajouter-annonce"
                        isAuthenticated={isConnected}
                        component={AddAdPage}
                    />
                    
                    <PrivateRoute 
                        path="/mes-recettes" 
                        isAuthenticated={isConnected}
                        component={MyRecipesPage} 
                    />
                    <PrivateRoute 
                        path="/mes-recettes-favorites" 
                        isAuthenticated={isConnected}
                        component={MyFavRecipesPage} 
                    />
                    <PrivateRoute 
                        path="/mes-annonces" 
                        isAuthenticated={isConnected}
                        component={MyAdsPage} 
                    />
                    
                    <Route 
                        path='/:name' 
                        component={SeasonalItemCardPage} 
                    />
                    <Route component={NotFound} />
                </Switch>
                <ToastContainer 
                    position= {toast.POSITION.BOTTOM_CENTER}
                    autoClose= {2000} />
        </Router>
        
    )
}
  
ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
