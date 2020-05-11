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
import SearchRecipePage from './components/pages/SearchRecipePage';
// import Footer from './components/Footer';
// ROUTES
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ToastContainer, toast } from 'react-toastify';
import ResumeAdPage from './components/pages/ResumeAdPage';
import ResumeUserPage from './components/pages/ResumeUserPage';



AuthApi.setup()

const PrivateRoute = ({path, component}) => {
    const isConnect = AuthApi.isAuthenticated()
    return isConnect ? (<Route path={path} component={component} />) :
    (toast.info("Tu as été déconnecté ⌛"), 
    <Redirect to="/login" />)
}

const AdminRoute = ({path, component}) => {
    const isConnectAdmin = AuthApi.isAuthenticated()
    const isAdmin = AuthApi.isAdmin();
    return isConnectAdmin && isAdmin ? (<Route path={path} component={component} />) : 
    (<Redirect to="/dashboard" />)
}

const Root = () => {

    const [isConnected, setIsConnected] = useState(AuthApi.isAuthenticated());
    const isAdmin = AuthApi.isAdmin();
    const HeaderWithRouter = withRouter(Header);
    const BackWithRouter = withRouter(BreadCrumbs);
    // const FooterWithRouter = withRouter(Footer);

    return (
        <Router>
            <HeaderWithRouter />
                <Switch>
                    {/* Route accessible par tout le monde */}
                    <Route 
                        exact path='/' 
                        component={IndexPage} 
                    />
                    
                    <Route  
                        exact path='/login'
                        render={(props) => 
                        <LoginPage 
                            onLogin={setIsConnected}
                            BackWithRouter={BackWithRouter}
                            {...props}
                        />} 
                    />

                    <Route 
                        exact path='/register' 
                        render={(props) => 
                        <RegistrationPage
                            BackWithRouter={BackWithRouter}
                            {...props}
                        />}
                    />

                    <Route
                        exact path='/dashboard'
                        component={DashboardPage} 
                    />

                    <Route 
                        exact path='/calendrier-des-saisons'
                        component={CalendarPage}
                    />

                    <Route
                        exact path="/liste-annonces"
                        component={ListAdPage}
                    />

                    <Route 
                        exact path='/carte-ingredient/:name'
                        render={(props) => 
                        <SeasonalItemCardPage
                            BackWithRouter={BackWithRouter}
                            {...props}
                        />}
                    />

                    <Route 
                        exact path='/annonce/:id'
                        render={(props) => 
                            <ResumeAdPage
                                BackWithRouter={BackWithRouter}
                                {...props}
                            />}
                    />
                    
                    <Route 
                        exact path="/trouver-recette"
                        component={SearchRecipePage}
                    />

                    <Route 
                        exact path="/liste-recette"
                        render={(props) => 
                            <ListRecipePage
                                BackWithRouter={BackWithRouter}
                                {...props}
                            />}
                    />

                    <Route 
                        exact path="/recette/:id"
                        render={(props) => 
                            <ResumeRecipe
                            BackWithRouter={BackWithRouter}
                            {...props}
                            />}
                    />

                    {/* ROUTE UTILISATEUR CONNECTE */}

                    <PrivateRoute
                        exact path="/ajouter-annonce"
                        component={AddAdPage}
                    />
                    
                    <PrivateRoute 
                        exact path="/mes-recettes" 
                        component={MyRecipesPage} 
                    />
                    <PrivateRoute 
                        exact path="/mes-recettes-favorites" 
                        component={MyFavRecipesPage} 
                    />
                    <PrivateRoute 
                        exact path="/mes-annonces" 
                        isAuthenticated={isConnected}
                        component={MyAdsPage} 
                    />
                    <PrivateRoute 
                        exact path="/ajouter-recette"
                        component={AddRecipePage} 
                    />
                   
                    <PrivateRoute
                        exact path="/utilisateur/:id"
                        component={ResumeUserPage}
                    />
                    <PrivateRoute 
                        exact path='/modifier-annonce' 
                        component={EditAdPage} 
                    />
                    <PrivateRoute 
                        exact path='/modifier-recette/:id' 
                        component={EditRecipePage} 
                    />
                    {/*ROUTE ADMIN*/}
                    <AdminRoute 
                        exact path="/admin/dashboard"
                        isAdmin={isAdmin}
                        component={AdminDashboard}
                    />

                    <AdminRoute 
                        exact path="/admin/gerer-recettes"
                        isAdmin={isAdmin}
                        component={ManageRecipes}
                    />

                    <AdminRoute 
                        exact path="/admin/gerer-annonces"
                        isAdmin={isAdmin}
                        component={ManageAds}
                    />

                    <AdminRoute 
                        exact path="/admin/gerer-ingredients"
                        isAdmin={isAdmin}
                        component={ManageIngredients}
                    />

                    <AdminRoute 
                        exact path="/admin/gerer-utilisateurs"
                        isAdmin={isAdmin}
                        component={ManageUsers}
                    />

                    {/* ROUTE NOT FOUND A LAISSER EN BAS DE PAGE !! */}
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
    