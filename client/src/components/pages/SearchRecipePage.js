import React, { Component } from 'react';
import axios from "axios";
import IngredientBlockButton from '../IngredientBlockButton';

class SearchRecipePage extends Component {
    state = { 
        ingredients: [], //Données de Ingredients récupérées depuis l'API
        ingTampon: [],
        ingByFamily: [], //Tableau des ingrédients en fonction du choix du type
        ingSelect: [], //Selection effectuée par l'utilisateur
        select: '' //Ingrédient selectionné actuellement
    }
    
    //Récupère les données de l'API et remplit le State ingredients
    componentDidMount() {
        try { axios.get("http://127.0.0.1:8000/api/ingredients")
            .then(res => {
                this.setState({ 
                    ingredients: res.data["hydra:member"],
                    ingTampon: res.data["hydra:member"]
                })
            })
        }catch(error) {console.log(error.response)}
    }

    //Supprime l'un des choix d'ingrédients selectionnés
    handleDelete = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const ingredient = this.state.ingTampon.find(item => item.name === value)
        const select = this.state.ingSelect.filter(item => item !== value)
        this.setState(prevState =>({
            ingredients: [...prevState.ingredients, ingredient],
        })
        );
        this.setState({ ingSelect : select })
        if(ingredient.family === this.state.select){
            this.setState(prevState =>({
                ingByFamily: [...prevState.ingByFamily, ingredient],
            })
            )
        }
    }

    //Ajoute un ingrédient à la selection
    handleAdd = (event) => {
        event.preventDefault()
        const value = event.target.value
        this.setState(prevState => ({
            ingSelect: [...prevState.ingSelect, value],
        }));
        const ingByFamily = this.state.ingByFamily.filter(item => item.name !== value)
        const ingredients = this.state.ingredients.filter(item => item.name !== value)
        this.setState({ ingByFamily : ingByFamily,  ingredients: ingredients })
    }

    //Envoie tous les ingrédients selectionnés afin de faire la recherche
    handleSubmit = (event) => {
        event.preventDefault()
        const ingSelect = this.state.ingSelect
        this.props.history.push({
            pathname: `/liste-recette`,
            props: {
                ingredients :ingSelect
            }
        })
        
    }

    //Affiche les ingrédients en fonction du type selectionné
    handleFamily = (event) => {
        const selectedFamily = event.target.options[event.target.selectedIndex].text
       
        if (this.state.ingSelect.length !== 0) {
            const ing = this.state.ingredients.filter(item =>
            !item.name.includes(this.handleAdd))
            const ingByFamily = ing.filter(item => 
                item.family.includes(selectedFamily)
                )
            
             this.setState({ ingByFamily : ingByFamily, select: selectedFamily })
            
        }else if(this.state.ingSelect.length === 0){
            const ingByFamily = this.state.ingredients.filter(item => 
                item.family.includes(selectedFamily) //contient les items qui ont dans "family" la famille qui a été sélectionné
                )
                this.setState({ ingByFamily : ingByFamily, select: selectedFamily })
        }
    }


    render() { 
        function tri(a,b)
        {
        return (a.name > b.name)?1:-1;
        }
        const families = ['légumes', 'fruits', 'boisson', 'matière grasse', 'aliments sucrés', 'féculents', 'légumineuses'].map((family, ind) => {
        return(
                <option name={family} key={ind} id={ind}  size="1" >{family}</option>
            )})

        return (
            <form onSubmit= {this.handleSubmit} value={this.state.ingByFamily}>
                <select name="family" id="family" size="1" onChange={this.handleFamily}>
                    <option defaultValue>Choisir une famille d'ingrédient</option>
                    {families}
                </select>
                <div className="fruitVegBlocks" > 
                        {
                            this.state.ingByFamily.sort(tri).map((ingredient) => 
                                <IngredientBlockButton
                                    key={ingredient.id}
                                    id={ingredient.id}
                                    family={ingredient.family}
                                    name={ingredient.name}
                                    icon={ingredient.icon}
                                    value={ingredient.name}
                                    handleAdd={this.handleAdd}
                                />
                            )
                        }
                    </div>
                    <p>Selection</p>
                    <button className="btn">
                        Valider
                    </button>
                    <div className="fruitVegBlocks" > 
                        {
                            this.state.ingSelect.map((ingredientName) => 
                                <IngredientBlockButton
                                    key={ingredientName}
                                    id={ingredientName}
                                    family={ingredientName}
                                    name={ingredientName}
                                    icon={ingredientName}
                                    value={ingredientName}
                                    handleAdd={this.handleDelete}
                                />
                            )
                        }
                    </div>
            </form>
        )
    }
}

export default SearchRecipePage;