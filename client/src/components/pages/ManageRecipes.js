import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/AddLoader';
import { toast } from 'react-toastify';

class ManageRecipes extends Component {
    state = { 
        recipes : [],
        loading : true
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/recipes')
             .then(res => {
                const recipes = res.data['hydra:member'].reverse();
                this.setState({ recipes, loading: false });
             })
    }

    handleDelete(id){
        const token = window.localStorage.getItem("authToken")

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let original = [...this.state.recipes]

        let recipes = this.state.recipes.filter(recipes => {return recipes.id !== id})

        this.setState({ recipes: recipes })

        axios.delete("http://127.0.0.1:8000/api/recipes/" + id, config)
            .then(response => toast.info("👌 La recette a été supprimée avec succès"))
            .catch(error => {
                this.setState({ recipes: original });
                console.log(error.response);
                toast.error("😞 Oups, quelque chose s'est mal passé")
            });
    }

    render() { 
        if (authApi.isAuthenticated()) {
            return (
               <div className="container">
                   {this.state.loading && <ListLoader /> }
                   <h2>Liste des recettes</h2>
                   <table>
                       <thead>
                           <tr>
                               <th>ID.</th>
                               <th>Crée par</th>
                               <th>Date de création</th>
                               <th>Titre</th>
                               <th /> 
                           </tr>
                       </thead>
                       <tbody>
                            
                            {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
                            { !this.state.loading && this.state.recipes.map(recipe => 
                                <tr key={recipe.id}>
                                    <td>{recipe.id}</td>
                                    <td>{recipe.user.username}</td>
                                    <td>{recipe.creationDate}</td>
                                    <td>{recipe.recipeTitle}</td>
                                    <td>
                                        <button className="btn" onClick={() => this.handleDelete(recipe.id)}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.9933 6.49329L6.00034 18.5" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M5.99316 6.49329L17.6059 18.1061" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
				                        </button>    
                                    </td>
                                </tr>
                            )}
                       </tbody>
                   </table>
               </div>
            )
        }
    }
}
 
export default ManageRecipes;