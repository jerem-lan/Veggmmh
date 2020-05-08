import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ListLoader from '../../loaders/ListLoader';

//recherche les recettes en fonction des ingrédients sélectionnés précédemment
class ListRecipePage extends Component {

    state = {
        recipes: [],
        ingredients:[],
        recipeSelect: [],
        filters: {
                apero: false,
                entrée: false, 
                plat: false, 
                dessert: false
                },
        filteredItems: [],
        isCheck: [
            {
                apero: false,
                entrée: false, 
                plat: false, 
                dessert: false
            }
        ],
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
                        this.setState({ recipeSelect })
                    })
    }

    handleCheck  = (event)  => {
        const value = event.target.name
        const checked = event.target.checked
        // const check = JSON.parse(this.state.filters)
        // this.setState(prevState => ([{...prevState.isCheck, [value]: checked }]))
        this.setState(prevState => {
            const filters = {
                ...prevState.filters,
                [value]: checked

            };
            
            const activeFilterTypes = Object.keys(filters).filter(
                filterType => filters[filterType]
            );
            
            const filteredItems = prevState.recipeSelect.filter(item =>
                activeFilterTypes.some(
                  activeFilterType => activeFilterType === item.type
                )
              );
            return {
            filters,
            filteredItems
            };
             
        })
        
    }

    renderCheckboxes() {
        return Object.keys(this.state.filters).map((type, index) => {
          return (
            <label key={index}>
              <input
                onChange={this.handleCheck}
                type="checkbox"
                checked={this.state.filters[type]}
                name={type}
              />
              {type}
            </label>
          );
        });
      }

    render() {
        const isCheck = (test) => {
            if(test === false)
               { return true}
        }
        const loading = this.state.loading
        const items = this.state.filteredItems.length || isCheck(Object.values(this.state.filters).every(isCheck))
            ? this.state.filteredItems
            : this.state.recipeSelect
           
        
        return (
            <>
                <div className="container--pageTitle">
                    <h2 className="pageTitle">Trouver une recette</h2>
                </div>
                <div className="container">
                    {loading && <ListLoader />}

                    {!loading && 
                    <>      
                        <div>{this.renderCheckboxes()}</div>
                        <h2>Recettes</h2>
                        {!items.length ? <p>Aucune recette trouvée</p>  : items.map(recipe => 
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
            </>
        );
    }
}

export default ListRecipePage;