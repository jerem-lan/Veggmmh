import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

class AddRecipePage extends Component {

    state = {
        ingredients: [], //Données de Ingredients récupérées depuis l'API
        title: '', //Titre de la recette
        preptime: '', //Temps de préparation en minute
        servings: '', //Nombre de portions
        quantities: [], //Quantités de chaque ingrédients sélectionnés
        steps: [], //Etape(s) de la recette
        type: '', //Tag de la recette (apero, entrée, plat ou dessert)

        ingredientsSelect: [], //Ingrédients sélectionnés qui composent la recette
        quantity: '', // quantité renseignée dans l'input quantité d'un ingrédient

        value: '', //Autosuggest
        suggestions: [] //Autosuggest. Les suggestions qui seront affichées 
    }

    //Récupère les données de Ingrédients issues de l'API. 
    //Appellée une fois que le composant AddRecipePage a été rendu correctement dans le DOM réel. 
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/ingredients")
            .then(res => {
                const ingredients = res.data['hydra:member']
                this.setState({ ingredients });
            })
            .catch(error => console.log(error.response))
    }

    //Récupere et set la valeur de l'élément ciblé en fonction de son attribut name.
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    //Récupere et set la valeur du textarea Steps ciblé en fonction de son attribut name, dans un tableau.
    handleChangeSteps = (event) => {
        event.preventDefault();
        const value = event.target.value;
        this.setState({ steps : [value] });
    };
    //Augmente ou décrémente en fonction du bouton ciblé (+ ou -) la valeur de l'input Servings et la set.
    handleInputNumber = (event) => {
        event.preventDefault();
        const buttonPlus = event.currentTarget.classList.contains('btn--plus');
        const inputServings = document.querySelector("#inputServings");
        buttonPlus ? inputServings.stepUp() : inputServings.stepDown();
        const value = inputServings.value;
        this.setState({ servings : value});
    };
    handleIngredients = (event) => {
        event.preventDefault();
        const suggest = this.state.value;
        const quantity = this.state.quantity;
        this.setState(prevState => ({
            quantities: [...prevState.quantities, quantity],
            ingredientsSelect: [...prevState.ingredientsSelect, suggest]
        }));
        this.setState({
            value : '',
            quantity : ''
        });
    };

    //AUTOSUGGEST
    //Met à jour la valeur de l'input value
    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
    };
    //Recalcule/met à jour les suggestions de l'input search pour les ingredients
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
    }; 
    //Purge les suggestions, le reset à vide. 
    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };
    // Calcule les suggestions pour n'importe quelle valeur d'un input donnée.
    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;  
        return inputLength === 0 ? [] : this.state.ingredients.filter(ingredient =>
          ingredient.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
    //Rempli l'entrée basée sur la suggestion cliquée. Calcule la valeur d'entrée pour chaque suggestion donnée.
    getSuggestionValue = (suggestion) => suggestion.name;
    renderSuggestion = (suggestion) => (
        <div>
          {suggestion.name}
        </div>
    );

    //Récupere les informations tapées dans le formulaire, l'envoie à l'API et purge le state
    handleSubmit = async event => {
        event.preventDefault();
        const token = window.localStorage.getItem("authToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const recipe = {
            recipeTitle: this.state.title,
            preparationTime: this.state.preptime,
            nbServings: this.state.servings,
            ingredients: this.state.ingredientsSelect,
            quantity: this.state.quantities,
            steps: this.state.steps,
            type: this.state.type
        };
        try { await axios.post( 
            'http://localhost:8000/api/recipes',
            recipe,
            config
            );
            this.setState({
                title: '',
                preptime: '',
                servings: '',
                ingredientsSelect: [],
                quantities: [],
                steps: [],
                type: ''
            });
        }catch(error){
            console.log(error);
        }
    }

    render() {
        const { value, suggestions } = this.state;
        // Autosuggest passe toutes ces props à l'input
        const inputProps = {
            placeholder: 'ex : tomate',
            value,
            onChange: this.onChange
        };

        return (
            <div className="container">
                <form className='form' onSubmit= {this.handleSubmit}>
                    <label className="label" htmlFor="title">Titre de ma recette</label>
                    <input
                        className='input'
                        name='title'
                        value={this.state.title}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Lasagnes provençales"
                        required />

                    <div className="input--group">
                        <div>
                            <label className="label" htmlFor="preptime">Temps de préparation</label>
                            <div className="input--time">
                                <input 
                                    className="input input--number"
                                    name="preptime"
                                    value={this.state.preptime}
                                    onChange={this.handleChange}
                                    type="number" 
                                    placeholder="120"
                                    required />
                                <span>min</span>
                            </div>
                        </div>
                        <div>
                            <label className="label" htmlFor="servings">Nombre de portions</label>
                            <div className="input--number">
                                <button
                                    className="btn--inputNumber btn--minus" 
                                    name="minus" 
                                    onClick={this.handleInputNumber}>
                                    -
                                </button>
                                <input
                                    id="inputServings"
                                    name="servings" 
                                    placeholder="0"
                                    type="number"
                                    min="1"/>
                                <button 
                                    className="btn--inputNumber btn--plus"
                                    name="plus" 
                                    onClick={this.handleInputNumber}>
                                    +
                                </button>
                            </div>
                        </div> 
                    </div>
                    
                    <label className="label" htmlFor="ingredients">Ingrédients</label>
                    { 
                        this.state.ingredientsSelect.length > 0 ?
                            <div className="ingredientBlock">
                                <div>
                                {
                                    this.state.ingredientsSelect.map(item =>
                                        <list-item id={item} key={item}>
                                            <p>{item}</p>
                                        </list-item>
                                    )
                                }
                                </div>
                                <div>
                                {
                                    this.state.quantities.map(qty =>
                                        <list-item id={qty} key={qty}>
                                            <p>{qty}</p>
                                        </list-item>
                                    )
                                }
                                </div>
                            </div> : <Fragment/> 
                    }

                    <div className="input--group">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                            onSuggestionSelected={this.onSuggestionSelected}/>
                        <input
                            className='input'
                            name='quantity'
                            value={this.state.quantity}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="quantité"/>
                        <button className="btn btn--add" onClick={this.handleIngredients}>+</button>
                    </div>
                        
                    <div>
                        <label className="label" htmlFor="steps">Etapes</label> 
                        <textarea
                            className="textarea--steps"
                            name='steps'
                            value={this.state.steps}
                            onChange={this.handleChangeSteps}
                            type="text"
                            placeholder="Découper les oignons et les faire revenir jusqu’à ce qu’ils soient fondants..."
                            required/>
                        <button className="" onClick={this.handleIngredients}>ajouter une étape</button>
                    </div>
                        
                    <div>
                        <label className="label" htmlFor="type">Tag</label>

                        <input type="radio" id="apero" name="type" value="Apero" onChange={this.handleChange}/>
                        <label htmlFor="apero">Apéro</label>
                        
                        <input type="radio" id="entree" name="type" value="Entree" onChange={this.handleChange}/>
                        <label htmlFor="entree">Entrée</label>

                        <input type="radio" id="plat" name="type" value="Plat" onChange={this.handleChange}/>
                        <label htmlFor="plat">Plat</label>

                        <input type="radio" id="dessert" name="type" value="Dessert" onChange={this.handleChange}/>
                        <label htmlFor="dessert">Dessert</label>
                    </div>
                    <button className="btn" type='submit'>Valider ma recette</button>
                </form>
            </div>
        );
    }
}

export default AddRecipePage;