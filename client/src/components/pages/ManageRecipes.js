import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/ListLoader';
import { toast } from 'react-toastify';
import PaginationForTab from '../PaginationForTab'
import { NavLink } from 'react-router-dom';

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
                recipe.type.toLowerCase().includes(this.state.search.toLowerCase()) ||
                recipe.user.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
                recipe.id.toString().includes(this.state.search)
            )
        
        const start = this.state.currentPage * itemsPerPage - itemsPerPage
        const paginatedRecipes = filteredRecipes.slice(start, start + itemsPerPage)

        if (authApi.isAuthenticated()) {
            return (
               <div className="container">
                    {this.state.loading && <ListLoader /> }
                    {!this.state.loading &&
                        <>
                            <h2 className="SectionTitle">Liste des recettes</h2>
                            <div>
                                <input type="text" placeholder="Rechercher" className='input input--search' onChange={this.handleSearch} value={this.state.search}/>
                            </div>
                            <table className="tableAdmin tableAdmin--recipes">
                                <thead>
                                    <tr>
                                        <th>ID.</th>
                                        <th>Titre</th>
                                        <th>Recette de</th>
                                        <th>Date de création</th>
                                        <th /> 
                                    </tr>
                                </thead>
                                <tbody>
                                        {paginatedRecipes.length === 0 && 
                                            <tr>
                                                <td> Aucun résultat </td>
                                            </tr>
                                        }
                                        {paginatedRecipes.map(recipe => 
                                            <tr key={recipe.id}>
                                                <td>{recipe.id}</td>
                                                <td><span className="recipeTypeTag recipeTypeTag--table">{recipe.type}</span><strong className="capitalize">{recipe.recipeTitle}</strong></td>
                                                <td>{recipe.user.username}</td>
                                                <td>{recipe.creationDate}</td>
                                                <td className="alignTabButton">
                                                    <NavLink to={{
                                                        pathname: `/recette/${recipe.id}`,
                                                        props: {
                                                            id: `${recipe.id}`,
                                                        }
                                                    }}>
                                                        <svg  viewBox="0 0 31 31" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill="none" d="M.5 1h30v30H.5z"/><path d="M26.8 16s-5 7-11.3 7c-6.3 0-11.3-7-11.3-7s5-7 11.3-7c6.2 0 11.3 7 11.3 7z" stroke="#56B693" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 20.6a4.6 4.6 0 100-9.2 4.6 4.6 0 000 9.2z" stroke="#56B693" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 18a2 2 0 100-4 2 2 0 000 4z" fill="#56B693"/>
                                                        </svg>
                                                    </NavLink>
                                                    <svg className="btn--delete" onClick={() => this.handleDelete(recipe.id)} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18 6L6 18M6 6l12 12" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                            <PaginationForTab currentPage={this.state.currentPage} itemsPerPage={itemsPerPage} length={filteredRecipes.length} onPageChanged={this.handlePageChanged}/>
                        </>
                    }               
                </div>
            )
        }
    }
}
 
export default ManageRecipes;