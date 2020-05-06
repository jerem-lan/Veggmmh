import React, { Component, Fragment } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import authApi from '../../services/authApi';
import IngredientBlock from '../IngredientBlock';

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

    render() {
        const BackWithRouter = this.props.BackWithRouter
        const type = this.state.type
        const quantity = this.state.quantity
        const ingredients = this.state.ingredients
        let ingredientsArray = []
        for (let index = 0; index < ingredients.length; index++) {
            ingredientsArray.push([ingredients[index], quantity[index]])
        }
        return (
            <Fragment>
                <BackWithRouter />
                <div className="container">
                    <div className="recipeInfos">
                        <div className="recipeType">
                            <p className="recipeTypeTag">{type}</p>
                            {authApi.isAuthenticated() &&
                            <button className="btn btn--favorite" type="submit" onClick={this.handleBookmarks}>
                                <svg viewBox="0 0 30 30" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15" r="15"/>
                                    <path d="M15 22c-1.48 0-8.3-4.75-8.3-9.75C6.7 9.9 8.6 8 10.94 8c1.94 0 3.3 1.48 4.06 2.62C15.76 9.48 17.12 8 19.06 8c2.34 0 4.24 1.9 4.24 4.25 0 5-6.82 9.75-8.3 9.75zM10.94 9.58a2.67 2.67 0 00-2.66 2.67c0 3.99 5.7 7.85 6.72 8.16 1.02-.3 6.72-4.17 6.72-8.16 0-1.48-1.19-2.67-2.66-2.67-2.06 0-3.32 2.94-3.34 2.97-.12.3-.4.48-.72.48-.32 0-.6-.19-.72-.48-.02-.03-1.28-2.97-3.34-2.97z"/>
                                </svg>
                            </button>}
                        </div>
                        <h2 className="recipeTitle">{this.state.title}</h2>
                        <p className="cooker">Recette de <span>{this.state.user}</span></p>
                        <div className="timeServing">
                            <svg viewBox="0 0 19 19" width="19" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.13 8.82a.42.42 0 01.36.18 1.2 1.2 0 001.94 0 .44.44 0 01.29-.18.42.42 0 01.32.09.44.44 0 01.17.3.46.46 0 01-.09.33 2.05 2.05 0 01-3.32 0 .45.45 0 01.1-.65.42.42 0 01.23-.07z" fill="#56B693"/><path fillRule="evenodd" clipRule="evenodd" d="M12.46 0c2.95 0 5.4 2.35 5.9 5.4l.01.03c.07.39.1.77.1 1.15v4.2a.46.46 0 01-.25.4c-1.02.51-2.1.9-3.2 1.12 2.06 1.08 3.57 3.41 3.97 6.2v.18a.43.43 0 01-.24.28.44.44 0 01-.18.04H6.35a.43.43 0 01-.18-.04.43.43 0 01-.23-.28.45.45 0 01-.01-.19 9.9 9.9 0 01.42-1.8H.43a.4.4 0 01-.18-.03.43.43 0 01-.23-.28.45.45 0 01-.02-.2 6.8 6.8 0 013.05-4.94c-.82-.2-1.6-.48-2.37-.87a.46.46 0 01-.18-.16.45.45 0 01-.06-.24V6.58c0-.34.03-.68.08-.99.42-2.49 2.43-4.41 4.84-4.41 1 0 1.95.33 2.73.9A5.75 5.75 0 0112.46 0zm-.1 4.99c-1.17 0-2.27.25-3.33.7.04 1.02-.08 2.1.06 3.06.29 1.66 1.7 2.91 3.37 2.91a3.5 3.5 0 003.43-3.44v-2.5a9.6 9.6 0 00-3.53-.73zm-7.08.39c-.91 0-1.77.19-2.6.54v1.9c0 1.4.94 2.78 2.68 2.78.4 0 .77-.1 1.1-.25.07-1.6-.13-3.34.08-4.85a6.99 6.99 0 00-1.26-.12zm7.18 7.17c-2.65 0-4.94 2.32-5.6 5.56h11.2c-.66-3.24-2.95-5.56-5.6-5.56z" fill="#56B693"/>
                            </svg>
                            <p>
                                {this.state.serving}
                            </p>
                            <svg viewBox="0 0 19 19" width="19" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="a" fill="#fff">
                                    <path d="M19 9.5a9.5 9.5 0 11-19 0 9.5 9.5 0 0119 0z"/>
                                </mask>
                                <path d="M14.25 10.25a.75.75 0 000-1.5v1.5zM9.5 9.5h-.75v.75h.75V9.5zm.75-4.75a.75.75 0 00-1.5 0h1.5zm4 4H9.5v1.5h4.75v-1.5zm-4 .75V4.75h-1.5V9.5h1.5zm7.25 0a8 8 0 01-8 8v3a11 11 0 0011-11h-3zm-8 8a8 8 0 01-8-8h-3a11 11 0 0011 11v-3zm-8-8a8 8 0 018-8v-3a11 11 0 00-11 11h3zm8-8a8 8 0 018 8h3a11 11 0 00-11-11v3z" fill="#56B693" mask="url(#a)"/>
                            </svg>
                            <p>
                                {this.state.times}' 
                            </p>
                        </div>
                    </div>

                    <div className="recipeDetails">
                        <h3>ingrédients</h3>
                        <div className="ingredientBlocks">
                            {ingredientsArray.map(ingredient => 
                                <IngredientBlock
                                    key={ingredient}
                                    name={ingredient[0]}
                                    quantity={ingredient[1]}
                                />
                            )}
                        </div>
                        <h3>étapes</h3>
                        <ul className="steps">
                            {this.state.steps.map((item, index) => 
                                <li key={index} className="step">
                                    <span className="stepNumber">{index + 1}</span>
                                    <p>{item}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ResumeRecipe;