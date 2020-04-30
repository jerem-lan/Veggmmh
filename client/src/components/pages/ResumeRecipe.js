import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import authApi from '../../services/authApi';

class ResumeRecipe extends Component {

    state = {
        ingredients: [],
        steps: [],
        quantity: [],
        type: "",
        serving: "",
        times: "",
        title: "",
        user: "",
        id: this.props.match.params.id
    }
    //dés que la page s'ouvre je charge les données de la recette
    componentDidMount() {
        const id = this.state.id
        axios
        .get("http://127.0.0.1:8000/api/recipes/" + id)
        .then(res => {
            const recipe = res.data;
            this.setState({ 
                ingredients : recipe.ingredients,
                steps : recipe.steps,
                quantity : recipe.quantity,
                type: recipe.type,
                serving: recipe.nbServings,
                times: recipe.preparationTime,
                title: recipe.recipeTitle,
                user: recipe.user.username
            });
        })
        .catch(error => {
            console.log(error.response);
        });
    }
    //fonction qui ajoute la recette en favoris
    handleBookmarks = (event) => {
        event.preventDefault()
        const recipe = {
            id: this.state.id
        }
        const token = window.localStorage.getItem("authToken")
        const decoded = jwtDecode(token)
        const id = decoded.id
        const config = {headers: { Authorization: `Bearer ${token}` }}
        axios
            .put("http://localhost:8000/api/bookmarks/"+id+"/add", recipe, config)
            .then(toast.info("Une nouvelle recette dans vos favoris 👌"))
            .catch(error =>
                toast.error("😞 Oups, quelque chose s'est mal passé")
            )
    }   
    //fonction qui permet de rassembler la quantité et les ingredients ensemble et de les afficher
    affichage = () => {
        const quantity = this.state.quantity
        const ingredients = this.state.ingredients
        let tab = []
        for (let index = 0; index < ingredients.length; index++) {
            tab[index] = ingredients[index] + " " + quantity[index]
        }
        return tab.map(item => <li key={item}>{item}</li>)
    }   

    render() {
        const steps = this.state.steps.map(item => <li key={item}>{item}</li>)
        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>Recette de {this.state.user}</p>
                <p>Pour : {this.state.serving} Personnes   Temps: {this.state.times} </p>
                <h2>Ingredients</h2>
                <ul>
                    {this.affichage()}
                </ul>
                <h2>Etapes</h2>
                <ol>
                    {steps}
                </ol>
                {authApi.isAuthenticated() &&
                <button className="btn" type="submit" onClick={this.handleBookmarks}>Favoris</button>}
            </div>

        );
    }
}

export default ResumeRecipe;