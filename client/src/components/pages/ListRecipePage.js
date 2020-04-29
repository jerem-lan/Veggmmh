import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ListLoader from '../../loaders/ListLoader';

class ListRecipePage extends Component {

    state = {
        recipes: [],
        loading: true
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/recipes')
             .then(res => {
                const recipes = res.data['hydra:member'].reverse();
                this.setState({ recipes, loading: false });
             })
    }

    render() {
        const loading = this.state.loading
        return (
            <div className="container">
                {loading && <ListLoader />}
                
                {!loading && 
               <>  
                    <h2>Recettes</h2>
                    {this.state.recipes.map(recipe => 
                    <div 
                        className="Card"
                        style={ { backgroundColor: '#e3fcf3'}} 
                        key={recipe.id}
                    >  
                        <Link to={"/recette/" + recipe.id} className="CardTitle"> 
                            {recipe.recipeTitle}
                        </Link> 
                    </div>
                )} </> }
            </div>
        );
    }
}

export default ListRecipePage;