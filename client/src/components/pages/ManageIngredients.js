import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/ListLoader';
import { toast } from 'react-toastify';
import PaginationForTab from '../PaginationForTab'
import { NavLink } from 'react-router-dom';
import inputControls from '../../services/inputControls';
import { INGREDIENTS_URL, INGREDIENTS_ADMIN_URL } from '../../services/config';


class ManageIngredients extends Component {
    state = { 
        ingredients : [],
        loading : true,
        currentPage : 1,
        search : "",
        name : "",
        family : "",
        conservation : "",
        season : [],
        icon : null
    }


    componentDidMount() {
        this.fetchData()
    }
    
    fetchData() {
        axios.get(INGREDIENTS_URL)
             .then(res => {
                const ingredients = res.data['hydra:member'].reverse();
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

        axios.delete(INGREDIENTS_ADMIN_URL + '/' + id, config)
            .then(response => toast.info("👌 L'ingredient a été supprimé avec succès"))
            .catch(error => {
                this.setState({ ingredients: original });
                console.log(error.response);
                toast.error("😞 Oups, quelque chose s'est mal passé")
            });
    }

    handleSubmit = async event => {
        event.preventDefault()
        //on recupère le token
        const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const ingredients = []
        this.state.ingredients.map(ingredient =>
            ingredients.push(ingredient.name)
        )
        //Retire les espaces du nom de l'ingrédient, et retire les majuscules pour respecter la mise en forme de la BDD pour la vérification
        const name = inputControls.truncString(this.state.name).toLowerCase()
        
        if(!ingredients.includes(name)) {
            const data = {
                name: inputControls.inputVerif(name),
                family: this.state.family,
                conservation: inputControls.inputVerif(this.state.conservation),
                season : this.state.season
            };
            //on donne le header et les données à axios
            try { await axios.post( 
                INGREDIENTS_ADMIN_URL,
                data,
                config
              );
                this.setState({
                    name: '',
                    family: '',
                    conservation: '',
                    season : []
                })
                toast.info("Votre ingrédient a été créé avec succès 👌")
                document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
                this.fetchData()
            }catch (error) {
                console.log(error.response.data) 
                toast.error("😞 Il y a des erreurs dans le formulaire")    
            }
        } else {
            toast.error("😞 L'ingrédient existe déjà") 
        }
    }

    //Récupere et set la valeur de l'élément ciblé en fonction de son attribut name.
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSearch = (event) => {
        const value = event.currentTarget.value;
        this.setState({ search : value, currentPage : 1 });
    };

    handlePageChanged = (page) => {
        this.setState({ currentPage : page })
    };

    handleCheck  = (event)  => {
        var monthArr = [...this.state.season];
        const value = event.target.value
        const index = monthArr.findIndex(month => month === value);
        if(index > -1) {
            monthArr = [...monthArr.slice(0, index), ...monthArr.slice(index + 1)]
        } else {
            monthArr.push(value);
        }
        this.setState({season: monthArr});
     }

    render() { 
        
        //Détermine les nombres d'annonces par page
        const itemsPerPage = 8;
        const filteredIngredients = this.state.ingredients.filter(
            ingredient =>
                ingredient.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ingredient.family.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ingredient.id.toString().includes(this.state.search)
            )
        
        const start = this.state.currentPage * itemsPerPage - itemsPerPage
        const paginatedIngredients = filteredIngredients.slice(start, start + itemsPerPage)

        const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"].map((month, ind) => {
            return (
                <span className="monthCheckbox" key={ind}>
                    <input type="checkbox" name={month} value={month} 
                    onChange={this.handleCheck} />
                    <label>{month}</label>
                </span>
            )
        })

        if (authApi.isAuthenticated()) {
            return (
                <div className="container">
                    {this.state.loading && <ListLoader /> }
                    {!this.state.loading &&
                        <>
                            <h2 className="SectionTitle">Liste des aliments</h2>
                            <form className="form newIngredientCard" onSubmit= {this.handleSubmit}>
                                <span>
                                    <div className="flexBlock">
                                        <input 
                                            className="input input--space" 
                                            type="text"
                                            name="name"
                                            placeholder="Nom du nouvel aliment"
                                            onChange={this.handleChange}
                                            value= {this.state.name}
                                        />
                                        <div className="select select--manageIngredients">
                                            <select 
                                                name="family" 
                                                onChange={this.handleChange}
                                                value={this.state.family}
                                                required
                                            >
                                                <option defaultValue hidden>Famille de l'aliment</option>
                                                <option value="Matière Grasse">Matière grasse</option>
                                                <option value="légumineuses">Légumineuses</option>
                                                <option value="légumes">Légumes</option>
                                                <option value="aliments sucrés">Aliments sucrés</option>
                                                <option value="féculents">Féculents</option>
                                                <option value="fruits">Fruits</option>
                                                <option value="Boisson">Boisson</option>
                                            </select>
                                        </div>
                                    </div>
                                    <textarea 
                                        className="textarea textarea--steps"
                                        placeholder="Conservation de l'aliment"
                                        name="conservation" 
                                        rows="4" 
                                        cols="25"
                                        onChange={this.handleChange}
                                        value= {this.state.conservation}
                                    />

                                    <div>
                                        {((this.state.family === "fruits") || (this.state.family === "légumes")) && 
                                            <>   
                                                <label className="monthCheckboxes__label">Mois de récolte :</label>
                                                <div className="monthCheckboxes">
                                                    {months}
                                                </div>
                                            </>
                                        }
                                    </div>
                                </span>
                                <button className="btn btn--validate" type="submit">Ajouter un nouvel aliment</button>
                            </form>

                            <div>
                                <input type="text" placeholder="Rechercher" className='input input--search' onChange={this.handleSearch} value={this.state.search}/>
                            </div>
                            <table className="tableAdmin tableAdmin--ingredients">
                                <thead>
                                    <tr>
                                        <th>ID.</th>
                                        <th>Famille</th>
                                        <th>Nom</th>
                                        <th /> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedIngredients.length === 0 && 
                                        <tr>
                                            <td> Aucun résultat </td>
                                        </tr>
                                    }
                                    {paginatedIngredients.map(ingredient => 
                                        <tr key={ingredient.id}>
                                            <td>{ingredient.id}</td>
                                            <td>{ingredient.family}</td>
                                            <td>{ingredient.name}</td>
                                            <td className="alignTabButton">
                                                <NavLink to={{
                                                    pathname: `/carte-ingredient/${ingredient.name}`,
                                                    props: {
                                                        name : {name : `${ingredient.name}`},
                                                        season : {season: `${ingredient.season}`},
                                                        icon : {icon: `${ingredient.icon}`}
                                                    }
                                                }}>
                                                    <svg  viewBox="0 0 31 31" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill="none" d="M.5 1h30v30H.5z"/><path d="M26.8 16s-5 7-11.3 7c-6.3 0-11.3-7-11.3-7s5-7 11.3-7c6.2 0 11.3 7 11.3 7z" stroke="#56B693" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 20.6a4.6 4.6 0 100-9.2 4.6 4.6 0 000 9.2z" stroke="#56B693" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 18a2 2 0 100-4 2 2 0 000 4z" fill="#56B693"/>
                                                    </svg>
                                                </NavLink>
                                                <svg className="btn--delete" onClick={() => this.handleDelete(ingredient.id)} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18M6 6l12 12" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <PaginationForTab currentPage={this.state.currentPage} itemsPerPage={itemsPerPage} length={filteredIngredients.length} onPageChanged={this.handlePageChanged}/>
                        </>
                    }
                </div>
            )
        }
    }
}
 
export default ManageIngredients;