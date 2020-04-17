import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

class AddRecipePage extends Component {
    state = {
        title: '',
        ingredientsSelect: [],
        steps: [],
        type: '', //choix
        servings: '', //choix x personnes
        preptime: '',
        quantity: [],
        ingredientsList: [], //tous les fruits/légumes récupérés depuis l'API
        valueQ: '',
        value: '',
        suggestions: []
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/ingredients")
            .then(res => {
            const ingredientsList = res.data['hydra:member']
            this.setState({ ingredientsList });
            })
            .catch(error => console.log(error.response))
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleIngredients = (event) => {
        event.preventDefault()
        const suggest = this.state.value
        const valueQ = this.state.valueQ
        this.setState(prevState => ({
            quantity: [...prevState.quantity, valueQ]
            }))
        this.setState(prevState => ({
                ingredientsSelect: [...prevState.ingredientsSelect, suggest]
                }))
        this.setState({value : ''})
        this.setState({valueQ : ''})
    }

    handleSupIngredients = (event => {
        event.preventDefault()
        const ingredients = [...this.state.ingredientsSelect]
        const indexI = ingredients.indexOf(event.target.value)
        const quantity = [...this.state.quantity]
        const indexQ = quantity.indexOf(event.target.value)
        if (indexI !== -1) {
            ingredients.splice(indexI, 1);
            this.setState({ingredientsSelect: ingredients});
          }
        if (indexQ !== -1) {
            quantity.splice(indexQ, 1);
            this.setState({quantity: quantity});
          }
    })

    handleChangeSteps = event => {
        event.preventDefault()
        const value = event.target.value
        this.setState({ steps : [value] })
    }
    
    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
    };
    
    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : this.state.ingredientsList.filter(ingredient =>
          ingredient.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.name;
      
    renderSuggestion = suggestion => (
        <div>
          {suggestion.name}
        </div>
    );

    handleSubmit = async event => {
        event.preventDefault()
        //on recupère le token
        const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const recipe = {
            recipeTitle: this.state.title,
            ingredients: this.state.ingredientsSelect,
            preparationTime: this.state.preptime,
            nbServings: this.state.servings,
            steps: this.state.steps,
            type: this.state.type,
            quantity: this.state.quantity
        };
        console.log(recipe)
        //on donne le header et les données à axios
        try { await axios.post( 
            'http://localhost:8000/api/recipes',
            recipe,
            config
          );

            this.setState({
                title: '',
                ingredientsSelect: [],
                steps: [],
                type: '',
                servings: '',
                preptime: '',
                quantity: []
            })
            //this.props.history.replace("/mes-recettes");
        }catch(error){
            console.log(error)
        }
    }

    render() {
        console.log(this.state.ingredientsSelect)
        console.log(this.state.quantity)
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Ex : Tomate',
            value,
            onChange: this.onChange
          };
        return (
                <div className="Content">
                    <form
                        className='form'
                        onSubmit= {this.handleSubmit}>
                        <label>
                             <h3>Titre de la recette</h3>
                            <input
                                name='title'
                                value={this.state.title}
                                onChange={this.handleChange}
                                type="text"
                                required >
                            </input>

                            <h3>Etapes</h3> 
                             <textarea
                                name='steps'
                                value={this.state.steps}
                                onChange={this.handleChangeSteps}
                                type="text"
                                rows="10" 
                                cols="40"
                                required
                            /> 

                            <h3>Choix des ingrédients</h3>
                            <input
                                name='valueQ'
                                value={this.state.valueQ}
                                onChange={this.handleChange}
                                type="text"
                            >
                            </input>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps}
                                onSuggestionSelected={this.onSuggestionSelected}
                            />
                            <button className="btn" onClick={this.handleIngredients}>+</button>
                            <br />

                            { 
                                this.state.ingredientsSelect.length > 0 ?
                                <Fragment>
                                <h3>Ingredients selectionnés</h3>
                                <div className="container">
                                {
                                    this.state.quantity.map(qty =>
                                        <list-item 
                                        id={qty}
                                        key={qty}>
                                        <p>{qty}</p>
                                        </list-item>)}
                                {
                                    this.state.ingredientsSelect.map(item =>
                                        <list-item 
                                        id={item}
                                        key={item}>
                                        <p>{item}</p>
                                        {}
                                        </list-item>)
                                        }
                                    <button className="btn" onClick={this.handleSupIngredients}>-</button>
                            </div>
                            <br />
                            <br />
                            </Fragment>
                            : <Fragment /> }
                            

                            <h3>Type</h3>
                            <select name="type" size="1" onChange={this.handleChange}>
                                <option defaultValue >Selection :</option>
                                <option value="Entree">Entrée</option>
                                <option value="Plat">Plat</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Apero">Apéro</option>
                            </select>
                            <br />
                            <br />

                            <h3>Nombre de portions</h3>
                            <select name="servings" size="1" onChange={this.handleChange}>
                                <option defaultValue >Selection :</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                            <br />
                            <br />

                            <h3>Temps de préparation</h3>
                            <input
                                name='preptime'
                                value={this.state.preptime}
                                onChange={this.handleChange}
                                type="text"
                                placeholder='En minutes'
                                required >
                            </input>
                            <br />
                            <br />
                        </label>
                        <button className="btn" type='submit'>
                            Envoyer!
                        </button>
                    </form>
                </div>
        );
    }
}

export default AddRecipePage;