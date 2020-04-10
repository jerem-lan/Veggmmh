import React, { Component, Fragment } from 'react'
import axios from "axios";
// COMPONENTS
import FruitVegBlock from '../FruitVegBlock'

class CalendarPage extends Component {
   
    state = {
        fruitsAndVeggies: [], // tous les fruits/légumes récupérés depuis l'API
        itemSelection: [], // les fruits/legumes trouvés après recherche par mois de disponibilité
        itemSelectionDeux: [], // les fruits/legumes trouvés après recherche par saisie de nom
        search: '' // le mot que l'on saisi dans l'input pour chercher un item
    }

    // recupère les fruits/légumes dans Ingredient issu des données de l'API
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/ingredients")
            .then(res => res.data["hydra:member"])
            .then((data) => {
                //retourne un nouveau tableau contenant tous les éléments du tableau d'ingrédients qui ont légumes ou fruits comme family
                const fruitsAndVeggies = data.filter(ingredient => {
                    return ingredient.family === "légumes" || ingredient.family === "fruits"
                })
                //trie le tableau 2D par leur name, dans l'ordre alphabétique
                fruitsAndVeggies.sort((a,b) => {
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
                this.setState({ fruitsAndVeggies: fruitsAndVeggies })
            })
            .catch(error => console.log(error.response))
    }

    // recherche item par son nom
    handleChange = (event) => {
        this.setState({ search: event.target.value })
        const itemSelectionDeux = this.state.fruitsAndVeggies.filter(item => 
            item.name.includes(this.state.search)
        )
        this.setState({ itemSelectionDeux })
    }

    // recherche items par mois
    handleMonth = (event) => {
        const selectedMonth = event.target.value
        const itemSelection = this.state.fruitsAndVeggies.filter(item => 
           item.season.includes(selectedMonth) //contient les items qui ont dans "season", le mois qui a été sélectionné
        )
        this.setState({ itemSelection })
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div className="title--category">Rechercher par aliment</div>
                    <input type='text' onChange={this.handleChange} value={this.state.search}/>
                    {
                        this.state.itemSelectionDeux.map((ingredient) => 
                            <FruitVegBlock
                                id={ingredient.id}
                                family={ingredient.family}
                                name={ingredient.name}
                                icon={ingredient.icon}
                            />)
                    }

                    <div className="title--category">Rechercher par mois</div>
                    <select size="1" onChange={this.handleMonth}>
                        <option defaultValue >choississez</option>
                        <option>janvier</option>
                        <option>février</option>
                        <option>mars</option>
                        <option>avril</option>
                        <option>mai</option>
                        <option>juin</option>
                        <option>juillet</option>
                        <option>août</option>
                        <option>septembre</option>
                        <option>octobre</option>
                        <option>novembre</option>
                        <option>décembre</option>
                    </select>
                    {
                        this.state.itemSelection.map((ingredient) => 
                            <FruitVegBlock
                                id={ingredient.id}
                                family={ingredient.family}
                                name={ingredient.name}
                                icon={ingredient.icon}
                            />)
                    }
                </div>
            </Fragment>
        )
    }    
}

export default CalendarPage;