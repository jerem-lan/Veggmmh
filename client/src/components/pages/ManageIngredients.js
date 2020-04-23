import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/AddLoader';
import { toast } from 'react-toastify';

class ManageIngredients extends Component {
    state = { 
        ingredients : [],
        loading : true
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/ingredients')
             .then(res => {
                const ingredients = res.data['hydra:member'];
                this.setState({ ingredients, loading: false });
             })
    }

    handleDelete(id){
        const token = window.localStorage.getItem("authToken")

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let original = [...this.state.ingredients]

        let ingredients = this.state.ingredients.filter(ingredients => {return ingredients.id !== id})

        this.setState({ ingredients: ingredients })

        axios.delete("http://127.0.0.1:8000/api/ingredients/" + id, config)
            .then(response => console.log('Ingredient supprimé'))
            .then(toast.info("👌 L'ingredient a été supprimé avec succès"))
            .catch(error => {
                this.setState({ ingredients: original });
                console.log(error.response);
                toast.error("😞 Oups, quelque chose s'est mal passé")
            });
    }

    render() { 
        if (authApi.isAuthenticated()) {
            return (
               <div className="container">
                   {this.state.loading && <ListLoader /> }
                   <table>
                       <thead>
                           <tr>
                               <th>ID.</th>
                               <th>Famille</th>
                               <th>Nom</th>
                               <th /> 
                           </tr>
                       </thead>
                       <tbody>
                            
                            {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
                            { !this.state.loading && this.state.ingredients.reverse().map(ingredient => 
                                <tr key={ingredient.id}>
                                    <td>{ingredient.id}</td>
                                    <td>{ingredient.family}</td>
                                    <td>{ingredient.name}</td>
                                    <td>
                                        <button className="btn" onClick={() => this.handleDelete(ingredient.id)}>
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
 
export default ManageIngredients;