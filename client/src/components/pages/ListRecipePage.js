import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ListLoader from '../../loaders/ListLoader';

//recherche les recettes en fonction des ingrédients sélectionnés précédemment
class ListRecipePage extends Component {

    state = {
        recipes: [],
        ingredients:[],
        recipeSelect: [],
        type: [],
        loading: true
    }

    componentDidMount(){
        try {
            //on recupere les props, on convertit la donnée en Json et on la met en variable
            const val = JSON.stringify(this.props.location.props.ingredients)
            //on stocke la variable dans le local storage et dans le State
            window.localStorage.setItem("ingredients",val );
            this.setState({ ingredients: this.props.location.props.ingredients})
            
        } catch {
            //si la page se rafraichit on prend la donnée stockée dans le local storage et on la remet dans le state
            this.setState({ ingredients: JSON.parse(window.localStorage.getItem("ingredients")) })

        }
        //on appelle l'API pour récupérer toute les recettes
        axios.get('http://localhost:8000/api/recipes')
             .then(res => {
                        const recipes = res.data['hydra:member']
                        this.setState({ recipes, loading: false });
                        //on récupère les ingrédients sélectionnés précédemment
                        const ingSelect = this.state.ingredients
                        //on compare ces ingrédients avec ceux des recttes et tout celles qui ont des ingrédients en commun sont stockées dans la variable
                        const recipeSelect = this.state.recipes.filter(item => item.ingredients.some(i => ingSelect.indexOf(i) !== -1))
                        this.setState({ recipeSelect: recipeSelect })
                    })
    }

    handleCheck  = (event)  => {
        
     }

    render() {
        const loading = this.state.loading
        const recipeSelect = this.state.recipeSelect
        const type = ['Apero', 'Entrée', 'Plat', 'Dessert'].map((type, ind) => {
            return (
                <div key={ind}>
                    <label>
                        <input type="checkbox" name={type} value={type} 
                        onChange={this.handleCheck} />{type}
                    </label>
                </div>
            )
        })
        return (
            <Fragment>
                <div className="container--pageTitle">
                    <h2 className="pageTitle">Trouver une recette</h2>
                </div>
                <div className="container">
                    {loading && <ListLoader />}

                    {!loading && 
                    <>      
                        <div>
                            {type}
                        </div>
                        <h2>Recettes</h2>
                        {recipeSelect.length === 0 ? <p>Aucune recette trouvée</p>  : recipeSelect.map(recipe => 
                        <div 
                            className="Card"
                            style={{ backgroundColor: '#e3fcf3' }} 
                            key={recipe.id}
                        >  
                            <Link to={"/recette/" + recipe.id} className="CardTitle"> 
                                {recipe.recipeTitle}
                            </Link> 
                        </div>
                    )} </> }
                </div>
            </Fragment>
        );
    }
}

export default ListRecipePage;