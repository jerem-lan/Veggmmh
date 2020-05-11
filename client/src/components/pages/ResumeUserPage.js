import React, { Component } from 'react';
import axios from 'axios';
import ListLoader from '../../loaders/ListLoader';
import { NavLink } from 'react-router-dom';
import PaginationForTab from '../PaginationForTab'
import { USERS_URL } from '../../services/config';

class ResumeUserPage extends Component {
    state = {
        id : "",
        email : "",
        username : "",
        firstname : "",
        lastname : "",
        postcode : "",
        registrationDate : "",
        ads : [],
        recipes : [],
        loading : true,
        currentAdsPage : 1,
        currentRecipesPage : 1,
        adsSearch : "",
        recipesSearch : ""
    }
    
    UNSAFE_componentWillMount() { 
        try {
            this.setState({id : this.props.location.props.id})
            this.setState({email : this.props.location.props.email})
            this.setState({username : this.props.location.props.username});
            this.setState({firstname : this.props.location.props.firstname});
            this.setState({lastname : this.props.location.props.lastname});
            this.setState({postcode : this.props.location.props.postcode});
            this.setState({registrationDate : this.props.location.props.registrationDate});
            window.localStorage.setItem("userId", this.props.location.props.id);
            window.localStorage.setItem("userEmail", this.props.location.props.email);
            window.localStorage.setItem("userUsername", this.props.location.props.username);
            window.localStorage.setItem("userFirstname", this.props.location.props.firstname);
            window.localStorage.setItem("userLastname", this.props.location.props.lastname);
            window.localStorage.setItem("userPostcode", this.props.location.props.postcode);
            window.localStorage.setItem("userRegistrationDate", this.props.location.props.registrationDate);
        } 
        catch(error) {
            this.setState({id : window.localStorage.getItem("userId")})
            this.setState({email : window.localStorage.getItem("userEmail")});
            this.setState({username : window.localStorage.getItem("userUsername")});
            this.setState({firstname : window.localStorage.getItem("userFirstname")});
            this.setState({lastname : window.localStorage.getItem("userLastname")});
            this.setState({postcode : window.localStorage.getItem("userPostcode")});
            this.setState({registrationDate : window.localStorage.getItem("userRegistrationDate")});
        }   
        
        const id = window.localStorage.getItem("userId")

        const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .get(USERS_URL + '/' + id + "/ads", config)
            .then(res => {
            const ads = res.data['hydra:member'];
            this.setState({loading : false, ads : ads})
        });
        //Requête pour avoir les recettes qu'il a crée
        axios
            .get(USERS_URL + '/' + id + "/recipes", config)
            .then(res => {
            const recipes = res.data['hydra:member'];
            this.setState({loading : false, recipes : recipes})
        });
    }

    // Fonction pour recherche/pagination ANNONCES
     handlePageChangedAds = (page) => {
        this.setState({currentAdsPage : page})
    }

     handleAdsSearch = (event) => {
        const value = event.currentTarget.value;
        this.setState({adsSearch : value, currentAdsPage : 1})
    }

    //Fonction pour recherche/pagination RECETTES
    handlePageChangedRecipes = (page) => {
        this.setState({currentRecipesPage : page})
    }

     handleRecipesSearch = (event) => {
        const value = event.currentTarget.value;
        this.setState({recipesSearch : value, currentRecipesPage : 1})
    }

    render() {
        
        //Nombre d'élément affiché par page
        const itemsPerPage = 5;

        //Filtre de recherche sur le tableau des ANNONCES.
        const filteredAds = this.state.ads.filter(
            ad =>
                ad.title.toLowerCase().includes(this.state.adsSearch.toString().toLowerCase())
            )

        //Filtre de recherche sur le tableau des RECETTES.
        const filteredRecipes = this.state.recipes.filter(
            recipe =>
                recipe.recipeTitle.toLowerCase().includes(this.state.recipesSearch.toString().toLowerCase()) ||
                recipe.type.toLowerCase().includes(this.state.recipesSearch.toString().toLowerCase()) 
            )
            
        // Calcule qui slice le tableau des recettes en fonction de la page sur laquelle on se trouve : ANNONCES
        const startAds = this.state.currentAdsPage * itemsPerPage - itemsPerPage
        const paginatedAds = filteredAds.slice(startAds, startAds + itemsPerPage)

        // Calcule qui slice le tableau des recettes en fonction de la page sur laquelle on se trouve : ANNONCES
        const startRecipes = this.state.currentRecipesPage * itemsPerPage - itemsPerPage
        const paginatedRecipes = filteredRecipes.slice(startRecipes, startRecipes + itemsPerPage)

        return (
            <div className="container">
                {this.state.loading && <ListLoader />}
                {!this.state.loading &&
                    <div>
                        <h2>{this.state.username}</h2>
                        <p>Inscrit le {this.state.registrationDate}</p>
                        <p> Nom : {this.state.lastname} </p>
                        <p> Prénom : {this.state.firstname} </p>
                        <p> Email : {this.state.email} </p>
                        <p> Code Postal : {this.state.postcode} </p>
                        <h2 className="SectionTitle">
                            <svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Liste des annonces
			            </h2>
                        {this.state.ads.length === 0 ? <p>Cet utilisateur n'a pas d'annonce enregistrée</p> :
                            <>
                                <input type="text" placeholder="Rechercher" className='input' onChange={this.handleAdsSearch} value={this.state.adsSearch}/>
                                {paginatedAds.length === 0 && 
                                    <tr>
                                        <td> Aucun résultat </td>
                                    </tr>
                                }
                                { paginatedAds.map(ad =>
                                    <NavLink key={ad.id} to={{
                                        pathname: `/annonce/${ad.id}`,
                                        props: {
                                            title: `${ad.title}`,
                                            idUser:`${ad.user.id}`,
                                            postcode: `${ad.postcode}`,
                                            creationDate: `${ad.creationDate}`,
                                            modificationDate: `${ad.modificationDate}`,
                                            content: `${ad.content}`,
                                            username: `${this.state.username}`,
                                            currentIdUser : `${this.state.id}`
                                        }
                                    }}>
                                        <div 
                                        className="Card"
                                        style={ { backgroundColor: '#e3fcf3'} } 
                                        >
                                            <div className="CardTitle"> 
                                                {ad.title}
                                            </div>
                                        </div>
                                    </NavLink>			
                                )}
                                <div>
                                    <PaginationForTab currentPage={this.state.currentAdsPage} itemsPerPage={itemsPerPage} length={filteredAds.length} onPageChanged={this.handlePageChangedAds}/>
                                </div>
                            </>
                        }
                        <h2 className="SectionTitle">
                            <svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Liste des recettes
			            </h2>
                        {this.state.recipes.length === 0 ? <p>Cet utilisateur n'a pas de recette enregistrée</p> :
                            <>
                                <input type="text" placeholder="Rechercher" className='input' onChange={this.handleRecipesSearch} value={this.state.recipesSearch}/>
                                {paginatedRecipes.length === 0 && 
                                    <tr>
                                        <td> Aucun résultat </td>
                                    </tr>
                                }
                                { paginatedRecipes.map(recipe =>
                                    <NavLink key={recipe.id} to={
                                        "/recette/" + recipe.id
                                    }>
                                        <div 
                                        className="Card"
                                        style={ { backgroundColor: '#e3fcf3'} } 
                                        >
                                            <div className="recipeType">
                                                    <p>{recipe.type}</p>
                                            </div>
                                            <div className="CardTitle"> 
                                                {recipe.recipeTitle}
                                            </div>
                                        </div>
                                    </NavLink>
                                )}
                                <div>
                                    <PaginationForTab currentPage={this.state.currentRecipesPage} itemsPerPage={itemsPerPage} length={filteredRecipes.length} onPageChanged={this.handlePageChangedRecipes}/>
                                </div>
                            </>
                        }
                    </div>
                }
            </div> 
        );
    }
};

export default ResumeUserPage;
