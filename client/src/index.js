import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// AUTHENTIFICATION API 
import AuthApi from './services/authApi';
// STYLE
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
// PAGES COMPONENTS
import Header from './components/Header';
import BreadCrumbs from './components/BreadCrumbs';
import IndexPage from './components/pages/IndexPage';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import DashboardPage from './components/pages/DashboardPage';
import CalendarPage from './components/pages/CalendarPage';
import SeasonalItemCardPage from './components/pages/SeasonalItemCardPage';
import AddAdPage from './components/pages/AddAdPage';
import ListAdPage from './components/pages/ListAdPage';
import MyRecipesPage from './components/pages/MyRecipesPage';
import AddRecipePage from './components/pages/AddRecipePage';
import MyFavRecipesPage from './components/pages/MyFavRecipesPage';
import MyAdsPage from './components/pages/MyAdsPage';
import EditAdPage from './components/pages/EditAdPage';
import EditRecipePage from './components/pages/EditRecipePage';
import AdminDashboard from './components/pages/AdminDashboard';
import ManageRecipes from './components/pages/ManageRecipes';
import ManageAds from './components/pages/ManageAds';
import ManageIngredients from './components/pages/ManageIngredients';
import ManageUsers from './components/pages/ManageUsers';
import NotFound from './components/pages/NotFound';
import ResumeRecipe from './components/pages/ResumeRecipe';
import ListRecipePage from './components/pages/ListRecipePage';
// import Footer from './components/Footer';
// ROUTES
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ToastContainer, toast } from 'react-toastify';
import authApi from './services/authApi';
import ResumeAdPage from './components/pages/ResumeAdPage';
import ResumeUserPage from './components/pages/ResumeUserPage';


AuthApi.setup()

const PrivateRoute = ({path, isAuthenticated, component}) => {
    return isAuthenticated ? (<Route path={path} component={component} />) :
    (toast.info("Tu as été déconnecté ⌛"), 
    <Redirect to="/login" />)
}

const AdminRoute = ({path, isAuthenticated, component, isAdmin}) => {
    return isAuthenticated && isAdmin ? (<Route path={path} component={component} />) : 
    (<Redirect to="/dashboard" />)
}

const Root = () => {

    const [isConnected, setIsConnected] = useState(AuthApi.isAuthenticated());
    const isAdmin = authApi.isAdmin();
    const HeaderWithRouter = withRouter(Header);
    const BackWithRouter = withRouter(BreadCrumbs);
    // const FooterWithRouter = withRouter(Footer);

    return (
        <Router>
            <HeaderWithRouter isConnected={isConnected} onLogout={setIsConnected} isAdmin={isAdmin} />
                <Switch>
                    <Route 
                        exact path='/' 
                        component={IndexPage} 
                    />
                    <Route  
                        path='/login'
                        render={(props) => 
                        <LoginPage 
                            onLogin={setIsConnected}
                            BackWithRouter={BackWithRouter}
                            {...props}
                        />} 
                    />
                    <Route 
                        path='/register' 
                        render={(props) => 
                        <RegistrationPage
                            BackWithRouter={BackWithRouter}
                            {...props}
                        />}
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
                    <PrivateRoute 
                        path="/ajouter-recette"
                        isAuthenticated={isConnected} 
                        component={AddRecipePage} 
                    />
                    <Route 
                        path="/recette/:id"
                        component={ResumeRecipe} 
                    />
                    <Route 
                        path="/trouver-recette"
                        component={ListRecipePage}
                    />
                    <Route
                        path="/utilisateur/:id"
                        isAuthenticated={isConnected}
                        component={ResumeUserPage}
                    />
                    <Route 
                        path='/modifier-annonce' 
                        component={EditAdPage} 
                    />
                    <Route 
                        path='/modifier-recette/:id' 
                        component={EditRecipePage} 
                    />
                    <Route 
                        path='/carte-ingredient/:name'
                        render={(props) => 
                        <SeasonalItemCardPage
                            BackWithRouter={BackWithRouter}
                            {...props}
                        />}
                    />
                    <Route 
                        path='/annonce/:id' 
                        component={ResumeAdPage} 
                    />
                    {/*ROUTE ADMIN*/}
                    <AdminRoute 
                        path="/admin/dashboard"
                        isAuthenticated={isConnected}
                        isAdmin={isAdmin}
                        component={AdminDashboard}
                    />
                    <AdminRoute 
                        path="/admin/gerer-recettes"
                        isAuthenticated={isConnected}
                        isAdmin={isAdmin}
                        component={ManageRecipes}
                    />
                    <AdminRoute 
                        path="/admin/gerer-annonces"
                        isAuthenticated={isConnected}
                        isAdmin={isAdmin}
                        component={ManageAds}
                    />
                    <AdminRoute 
                        path="/admin/gerer-ingredients"
                        isAuthenticated={isConnected}
                        isAdmin={isAdmin}
                        component={ManageIngredients}
                    />
                    <AdminRoute 
                        path="/admin/gerer-utilisateurs"
                        isAuthenticated={isConnected}
                        isAdmin={isAdmin}
                        component={ManageUsers}
                    />
                    <Route component={NotFound} />
                </Switch>
                <ToastContainer 
                    position= {toast.POSITION.BOTTOM_CENTER}
                    autoClose= {2000} />
                {/* <FooterWithRouter/> */}
        </Router>
        
    )
}
  
ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
