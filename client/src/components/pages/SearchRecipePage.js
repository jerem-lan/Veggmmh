import React, { Component } from 'react';
import axios from "axios";
import IngredientBlockButton from '../IngredientBlockButton';

class SearchRecipePage extends Component {
    state = { 
        ingredients: [], //Données de Ingredients récupérées depuis l'API
        ingTampon: [],
        ingList: [],
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
        const select = this.state.ingSelect.filter(item => item.name !== value)
        const ingList = this.state.ingList.filter(item => item.name !== value)
        this.setState(prevState =>({
            ingredients: [...prevState.ingredients, ingredient]
        })
        );
        this.setState({ ingSelect : select, ingList: ingList })
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
        const ingredient = this.state.ingTampon.find(item => item.name === value)
        this.setState(prevState => ({
            ingSelect: [...prevState.ingSelect, ingredient],
            ingList: [...prevState.ingList, value]
        }));
        const ingByFamily = this.state.ingByFamily.filter(item => item.name !== value)
        const ingredients = this.state.ingredients.filter(item => item.name !== value)
        this.setState({ ingByFamily : ingByFamily,  ingredients: ingredients })
    }

    //Envoie tous les ingrédients selectionnés afin de faire la recherche
    handleSubmit = (event) => {
        event.preventDefault()
        const ingList = this.state.ingList
        this.props.history.push({
            pathname: `/liste-recette`,
            props: {
                ingredients :ingList
            }
        })
        
    }

    //Affiche les ingrédients en fonction du type selectionné
    handleFamily = (event) => {
        const selectedFamily = event.target.options[event.target.selectedIndex].value
       
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
        function tri(a,b) {
            return (a.name > b.name)?1:-1;
        }
        // const families = ['légumes', 'fruits', 'boisson', 'matière grasse', 'aliments sucrés', 'féculents', 'légumineuses'].map((family, ind) => {
        // return(
        //         <option name={family} key={ind} id={ind}  size="1" >{family}</option>
        //     )})

        return (
            <div className="container">
                <h2 className="SectionTitle">Trouver une recette</h2>
                <form onSubmit= {this.handleSubmit} value={this.state.ingByFamily}>

                    <label className="label">Mes ingrédients</label>
                    <div className="fruitVegBlocks" > 
                    {
                        this.state.ingSelect.map((ingredientName) => 
                            <IngredientBlockButton
                                key={ingredientName.id}
                                id={ingredientName.id}
                                family={ingredientName.family}
                                name={ingredientName.name}
                                icon={ingredientName.icon}
                                value={ingredientName.name}
                                handleAdd={this.handleDelete}
                                style={ingredientName.family}
                            />
                        )
                    }
                    </div>
                    <button className="btn btn--validate btn--recipeSearch">Lancer la recherche</button>
                    

                    <label className="label">Rechercher un ingrédient</label>
                    <div class="select">
                        <select name="family" id="family" size="1" onChange={this.handleFamily}>
                            <option hidden>Choisir une famille d'ingrédient</option>
                            <option value="féculents">Féculents</option>
                            <option value="légumes">Légumes</option>
                            <option value="légumineuses">Légumineuses</option>
                            <option value="fruits">Fruits</option>
                            <option value="matière grasse">Matières grasses</option>
                            <option value="aliments sucrés">Aliments sucrés</option>
                            <option value="boisson">Boissons</option>
                        </select>
                    </div>
                    <div className="fruitVegBlocks ingredientBlock--family" > 
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
                                style={ingredient.family}
                            />
                        )
                    }
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchRecipePage;