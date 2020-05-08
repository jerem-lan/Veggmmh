import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { toast } from 'react-toastify';
import AlertMessage from '../AlertMessage';
import inputControls from '../../services/inputControls';

class AddRecipePage extends Component {

    state = {
        ingredients: [], //Données de Ingredients récupérées depuis l'API
        title: '', //Titre de la recette
        preptime: '', //Temps de préparation en minute
        servings: '', //Nombre de portions
        quantities: [], //Quantités de chaque ingrédients sélectionnés
        type: '', //Tag de la recette (apero, entrée, plat ou dessert)
        value: '', //Autosuggest
        suggestions: [], //Autosuggest. Les suggestions qui seront affichées 
        ingredientsSelect: [], //Ingrédients sélectionnés qui composent la recette
        quantity: '', //Quantité renseignée dans l'input quantité d'un ingrédient
        newSteps: [""], //Liste des étapes
        errorIngredients: "", //Eventuelles erreurs liées aux ingrédients
        errorTitre: ""
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

            document.querySelector(".removeStep").style.display="none";
    }

    //Récupere et set la valeur de l'élément ciblé en fonction de son attribut name.
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
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

    //INGREDIENTS
    handleIngredients = (event) => {
        event.preventDefault();
        const suggest = this.state.value;
        const quantity = this.state.quantity
        if (inputControls.spaceVerif(quantity) && inputControls.spaceVerif(suggest)) {
        //Verif que les champs ne soient pas vides
            if (suggest && quantity !== "") {
                //Verif que l'ingrédient choisi n'a pas encore été selectionné
                if (!this.state.ingredientsSelect.includes(suggest)) {
                    this.setState(prevState => ({
                        quantities: [...prevState.quantities, quantity],
                        ingredientsSelect: [...prevState.ingredientsSelect, suggest]
                    }));
                    this.setState({
                        value : '',
                        quantity : '',
                        errorIngredients: ''
                    });
                }else {
                    this.setState({errorIngredients : "Vous avez déjà renseigné cet ingrédient"})
                }
            }else{
                this.setState({errorIngredients : "Vous n'avez pas entré d'ingrédient, sa quantité ou ni l'un ni l'autre"})
            }
        }else{
            this.setState({errorIngredients : "Vous n'avez rentré que des espaces dans l'un des champs"})
        }
    };
    // Ajoute l'icone correspondante au nom de l'ingredient selectionné
    requireIcon = (item) => {
        try {
            return require(`../../icons/ingredients/${item}.svg`)
        } catch (err) {
            return require(`../../icons/ingredients/defaut-boissons.svg`)
        }
    }
    //Supprime l'élément du tableau ingredientSelect (nom) et quantities (quantité) ciblé par son index grâce au bouton de suppression
    removeIngredient = (event) => {
        event.preventDefault();
        const index = event.currentTarget.parentNode.id;
        this.state.quantities.splice(index, 1);
        this.state.ingredientsSelect.splice(index, 1);
        this.setState({
            quantities: this.state.quantities,
            ingredientsSelect: this.state.ingredientsSelect
        });
    }

    //STEPS
    //Récupere et set la valeur du textarea Steps ciblé en fonction de son attribut name, dans un tableau.
    handleChangeSteps = idx => (event) => {
        event.preventDefault();
        const newSteps = this.state.newSteps.map((step, sidx)=>
        {
            //Récupère l'index du champs actuellement modifié, et le compare au nouvel index du .map
            //Si les indexs sont différents, renvoie la valeur à l'index du state..map
            //S'ils sont les mêmes, renvoie la valeur sur l'index du champs modifié
            if (idx !== sidx) return step
            return event.target.value
        })
        this.setState({newSteps: newSteps})
    };
    //Ajoute une étape avec son textarea
    handleAddStep = (event) => {
        event.preventDefault()
        this.setState(prevState => ({
            newSteps: [...prevState.newSteps, ""]
        }));
    };
    //Retire une étape
    handleRemoveStep = idx => (event) => {
        event.preventDefault()
        this.setState({
            newSteps: this.state.newSteps.filter((s, sidx) => idx !== sidx)
        });
    };

    //Récupere les informations tapées dans le formulaire, l'envoie à l'API et purge le state
    handleSubmit = async event => {
        event.preventDefault();
        const token = window.localStorage.getItem("authToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        //Permet la vérification des espaces dans les étapes
        //Fonction renvoyant true si la valeur est supérieure à zéro
        const arraySpace = (value) => value > 0
        //Tableau contenant des valeurs équivalents au nombre de caractères de chaque étape
        const testArray = this.state.newSteps.map(step => inputControls.spaceVerif(step))

        const recipe = {
            recipeTitle: inputControls.inputVerif(this.state.title),
            preparationTime: this.state.preptime,
            nbServings: this.state.servings,
            ingredients: this.state.ingredientsSelect,
            quantity: this.state.quantities,
            steps: this.state.newSteps,
            type: this.state.type
        };
        //Teste chaque valeur de testArray, si une seule d'entre vaut 0, il n'y a pas d'autre caractère que des espaces, et renvoie false
        if (inputControls.spaceVerif(recipe.recipeTitle) && testArray.every(arraySpace)) {
            if (recipe.quantity && recipe.steps !== "") {
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
                        newSteps: [],
                        type: ''
                    });
                    toast.info("Votre recette a été créée avec succès 👌")
                    this.props.history.push('/dashboard')
                }catch(error){
                    console.log(error);
                }
            }  
        }else{
            this.setState({errorTitre : "Certains de vos champs ne comprennent que des espaces"})
        }
    }

    render() {
        const { value, suggestions } = this.state;
        // Autosuggest passe toutes ces props à l'input
        const inputProps = {
            placeholder: 'Ex : tomate',
            value,
            onChange: this.onChange
        };

        return (
            <div className="container">
                <h2 className="SectionTitle">Publier une recette</h2>
                <form className='form' onSubmit= {this.handleSubmit}>
                    <div>
                    {this.state.errorTitre ? <AlertMessage message = {this.state.errorTitre} />: "" }
                        <label className="label" htmlFor="title">Titre de ma recette</label>
                        <input
                            className='input'
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Ex : Lasagnes provençales"
                            required />
                    </div>

                    <div className="input--group">
                        <div className="input--space">
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
                                    onChange={this.handleChange} 
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
                    {this.state.errorIngredients ? <AlertMessage message = {this.state.errorIngredients} />: "" }
                    { 
                        this.state.ingredientsSelect.length > 0 ?
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        {
                                            this.state.ingredientsSelect.map((item, index) =>
                                                <div id={index} key={index} className="ingredientRow">
                                                    <img src={this.requireIcon(item)} alt={item}/>
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.quantities.map((qty, index) =>
                                                <div id={index} key={index} className="ingredientRow ingredientRow--quantity">
                                                    <p>{qty}</p>
                                                    <svg className="btn--delete" onClick={this.removeIngredient} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18 6L6 18M6 6l12 12" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                </div>
                                            )
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>: <Fragment/> 
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
                            placeholder="Ex : 70gr, 1càs, à convenance..."/>
                        <button className="btn btn--add" onClick={this.handleIngredients}>+</button>
                    </div>
                        
                    <label className="label" htmlFor="steps">Etapes</label> 
                    {
                        this.state.newSteps.map((newStep, idx)=> 
                            <div className="steps" key={idx}>
                                <textarea
                                    className="textarea textarea--steps"
                                    name='steps'
                                    value={newStep}
                                    onChange={this.handleChangeSteps(idx)}
                                    type="text"
                                    placeholder="Découper les oignons et les faire revenir jusqu’à ce qu’ils soient fondants..."
                                    required />
                                <svg className="btn--delete removeStep" onClick={this.handleRemoveStep(idx)} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                        )
                    }
                    <button className="btn--addStep" onClick={this.handleAddStep}>+ ajouter une étape</button>

                        
                    <div>
                        <label className="label" htmlFor="type">Tag</label>
                        <div className="btn--radio">
                            <div>
                                <input type="radio" id="apero" name="type" value="Apero" onChange={this.handleChange}/>
                                <label htmlFor="apero">Apéro</label>
                            </div>
                            <div>
                                <input type="radio" id="entree" name="type" value="Entree" onChange={this.handleChange}/>
                                <label htmlFor="entree">Entrée</label>
                            </div>
                            <div>
                                <input type="radio" id="plat" name="type" value="Plat" onChange={this.handleChange}/>
                                <label htmlFor="plat">Plat</label>
                            </div>
                            <div>
                                <input type="radio" id="dessert" name="type" value="Dessert" onChange={this.handleChange}/>
                                <label htmlFor="dessert">Dessert</label>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn--validate" type='submit'>Soumettre ma recette</button>
                </form>
            </div>
        );
    }
}

export default AddRecipePage;