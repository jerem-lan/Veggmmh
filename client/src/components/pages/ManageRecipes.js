import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/AddLoader';
import { toast } from 'react-toastify';
import PaginationForTab from '../PaginationForTab'

class ManageRecipes extends Component {
    state = { 
        recipes : [],
        loading : true,
        currentPage : 1,
        search : ""
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

    handleSearch = (event) => {
        const value = event.currentTarget.value;
        this.setState({ search : value, currentPage : 1 });
    }

    handlePageChanged = (page) => {
        this.setState({ currentPage : page })
    }

    render() { 

        //Détermine les nombres d'annonces par page
        const itemsPerPage = 5;

        const filteredRecipes = this.state.recipes.filter(
            recipe =>
                recipe.recipeTitle.toLowerCase().includes(this.state.search.toLowerCase()) ||
                recipe.user.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
                recipe.id.toString().includes(this.state.search)
            )
        
        const start = this.state.currentPage * itemsPerPage - itemsPerPage
        const paginatedRecipes = filteredRecipes.slice(start, start + itemsPerPage)

        if (authApi.isAuthenticated()) {
            return (
               <div className="container">
                   {this.state.loading && <ListLoader /> }
                   <h2>Liste des recettes</h2>
                   <div>
                       <input type="text" placeholder="Rechercher" className='input' onChange={this.handleSearch} value={this.state.search}/>
                   </div>
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
                            {paginatedRecipes.length === 0 && 
                                <tr>
                                    <td> Aucun résultat </td>
                                </tr>
                            }
                            { !this.state.loading && paginatedRecipes.map(recipe => 
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
                   <PaginationForTab currentPage={this.state.currentPage} itemsPerPage={itemsPerPage} length={filteredRecipes.length} onPageChanged={this.handlePageChanged}/>
               </div>
            )
        }
    }
}
 
export default ManageRecipes;