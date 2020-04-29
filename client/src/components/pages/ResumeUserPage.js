import React, { Component } from 'react';
import axios from 'axios';
import ListLoader from '../../loaders/ListLoader';
import { NavLink } from 'react-router-dom';

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
        loading : true
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
        console.log(id)
        const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .get("http://localhost:8000/api/users/"+id+"/ads", config)
            .then(res => {
            const ads = res.data['hydra:member'];
            this.setState({loading : false, ads : ads})
        });
        //Requête pour avoir les recettes qu'il a crée
        axios
            .get("http://localhost:8000/api/users/"+id+"/recipes", config)
            .then(res => {
            const recipes = res.data['hydra:member'];
            this.setState({loading : false, recipes : recipes})
        });
    }

    render() {
        console.log(this.state.ads)
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

                        <h2>Liste des annonces</h2>
                        { this.state.ads.map(ad =>
                            <NavLink key={ad.id} to={{
                                pathname: `/annonce/${ad.id}`,
                                 props: {
                                    title: `${ad.title}`,
                                    postcode: `${ad.postcode}`,
                                    creationDate: `${ad.creationDate}`,
                                    modificationDate: `${ad.modificationDate}`,
                                    content: `${ad.content}`,
                                    username: `${this.state.username}`
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
                        <h2>Liste des recettes</h2>
                        { this.state.recipes.map(recipe =>
                            <NavLink key={recipe.id} to={{
                                //Navlink vers la page afficher recette individuelle
                            }}>
                                <div 
                                className="Card"
                                style={ { backgroundColor: '#e3fcf3'} } 
                                >
                                    <div className="CardTitle"> 
                                        {recipe.recipeTitle}
                                    </div>
                                </div>
                            </NavLink>
                        )}
                    </div>
                }
            </div> 
        );
    }
};

export default ResumeUserPage;
