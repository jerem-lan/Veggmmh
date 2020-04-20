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

    // handleValueQuantity = event => {
    //     const value = event.target.value
    //     return value
    // }

    // handleChangeQuantity = event => { 
    //     const quantity = this.handleValueQuantity(event);
    //     this.setState({quantity: [... this.state.quantity, quantity] })
    // }

    // handleChangeQuantity = (event) => {
    //     const test = this.handleValueQuantity(event)
    //     const qt = this.state.quantity
    //     //this.setState({ quantity: [ test, this.handleValueQuantity(event)] })
    //     this.setState({
    //         quantity: [qt, test]
    //       })
    // }

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

    //   onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
    //     event.preventDefault()
    //     const suggest = suggestionValue
    //     this.setState(prevState => ({
    //         ingredientsSelect: [...prevState.ingredientsSelect, suggest]
    //       }))
    //     this.setState({value : ''})
    // };

    handleSubmit = async event => {
        event.preventDefault()
        const token = window.localStorage.getItem("authToken")
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
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'ex : tomate',
            value,
            onChange: this.onChange
        };
        return (
            <div className="container">
                <form className='form' onSubmit= {this.handleSubmit}>
                    <div>
                        <h3>Titre de ma recette</h3>
                        <input
                            className='input'
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Lasagnes provençales"
                            required />
                    </div>

                    <div className="input--group">
                        <div>
                            <h3>Temps de préparation</h3>
                            <input
                                className='input'
                                name='preptime'
                                value={this.state.preptime}
                                onChange={this.handleChange}
                                type="text"
                                placeholder='en minutes'
                                required />
                        </div>
                        <div>
                            <h3>Nombre de portions</h3>
                            <select className='input' name="servings" size="1" onChange={this.handleChange}>
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
                        </div>
                    </div>
                    
                    <div>
                        <h3>Ingrédients</h3>
                        { 
                            this.state.ingredientsSelect.length > 0 ?
                                <div className="container">
                                    {
                                        this.state.ingredientsSelect.map(item =>
                                            <list-item id={item} key={item}>
                                                <p>{item}</p>
                                                {}
                                            </list-item>
                                        )
                                    }
                                    {
                                        this.state.quantity.map(qty =>
                                            <list-item id={qty} key={qty}>
                                                <p>{qty}</p>
                                            </list-item>
                                        )
                                    }
                                </div> : <Fragment/> 
                        }
                    </div>
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
                            name='valueQ'
                            value={this.state.valueQ}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="quantité"
                            required />
                            <button className="btn" onClick={this.handleIngredients}>+</button>
                    </div>
                        
                    <div>
                        <h3>Etapes</h3> 
                        <textarea
                            name='steps'
                            value={this.state.steps}
                            onChange={this.handleChangeSteps}
                            type="text"
                            rows="10" 
                            cols="40"
                            placeholder="Découper les oignons et les faire revenir jusqu’à ce qu’ils soient fondants..."
                            required/>
                        <button className="" onClick={this.handleIngredients}>ajouter une étape</button>
                    </div>
                        
                    <div>
                        <h3>Tag</h3>

                        <input type="radio" id="apero" name="type" value="apero" onChange={this.handleChange}/>
                        <label for="apero">Apéro</label>
                        
                        <input type="radio" id="entree" name="type" value="entree" onChange={this.handleChange}/>
                        <label for="entree">Entrée</label>

                        <input type="radio" id="plat" name="type" value="plat" onChange={this.handleChange}/>
                        <label for="plat">Plat</label>

                        <input type="radio" id="dessert" name="type" value="dessert" onChange={this.handleChange}/>
                        <label for="dessert">Dessert</label>
                    </div>
                    <button className="btn" type='submit'>Valider ma recette</button>
                </form>
            </div>
        );
    }
}

export default AddRecipePage;