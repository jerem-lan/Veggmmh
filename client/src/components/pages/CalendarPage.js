import React, { Component } from 'react'
import axios from "axios";
import FruitVegBlock from '../FruitVegBlock'
import IngredientLoader from '../../loaders/IngredientsLoader';

class CalendarPage extends Component {
   
    state = {
        fruitsAndVeggies: [], // tous les fruits/légumes récupérés depuis l'API
        itemSelection: [], // les fruits/legumes trouvés après recherche par mois de disponibilité
        itemSelectionDeux: [], // les fruits/legumes trouvés après recherche par saisie de nom
        search: '', // le mot que l'on saisi dans l'input pour chercher un item
        loading: false
    }

    // recupère les fruits/légumes dans Ingredient issu des données de l'API
    componentDidMount() {
        try { axios.get("http://127.0.0.1:8000/api/ingredients")
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
                this.setState({ 
                    fruitsAndVeggies: fruitsAndVeggies
                })
                //Affiche les fruits/légumes du mois courant dès le premier rendu
                const now = new Date();
                const currentMonth = now.getMonth();
                const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
                for(let m = 0; m <= 11; m++) {
                    const option = document.createElement("OPTION"); //crée des <option/>
                    option.text = months[m];
                    option.value = (m+1); // les mois commencent à 1 côté serveur
                    if ( m === currentMonth) {
                        option.selected = true;
                        const itemSelection = this.state.fruitsAndVeggies.filter(item => 
                            item.season.includes(option.text)
                        )
                        this.setState({ itemSelection })
                    }
                    document.getElementById('month').options.add(option); //rend les <options/> dans le <select /> qui a l'id month 
                }
            })
        }catch(error) {console.log(error.response)}
    }

    // recherche item par son nom
    handleChange = (event) => {
        this.setState({ search: event.target.value, loading: true })
        const itemSelectionDeux = this.state.fruitsAndVeggies.filter(item => 
            item.name.includes(this.state.search)
        )
        this.setState({ itemSelectionDeux, loading: false }) 
    }

    // recherche items par mois
    handleMonth = (event) => {
        const selectedMonth = event.target.options[event.target.selectedIndex].text
        const itemSelection = this.state.fruitsAndVeggies.filter(item => 
           item.season.includes(selectedMonth) //contient les items qui ont dans "season", le mois qui a été sélectionné
        )
        this.setState({ itemSelection })
    }
    
    render() {
        const loading = this.state.loading
        return (
            <div className="container">
                <label className="label">Rechercher par aliment</label>
                <input className="input input--search" type='text' onChange={this.handleChange} value={this.state.search} placeholder="tomate"/>
                <div className="fruitVegBlocks">
                    {loading && <IngredientLoader />} 
                    {
                        this.state.itemSelectionDeux.map((ingredient) => 
                            !loading && <FruitVegBlock
                                key={ingredient.id}
                                id={ingredient.id}
                                family={ingredient.family}
                                name={ingredient.name}
                                icon={ingredient.icon}
                                season={ingredient.season}
                            />)
                    }   
                </div>

                <label className="label">Rechercher par mois</label>
                <select name="month" id="month"  size="1" onChange={this.handleMonth}></select>   
                <div className="fruitVegBlocks" >
                    {loading && <IngredientLoader />} 
                    {
                        this.state.itemSelection.map((ingredient) => 
                         !loading && <FruitVegBlock
                                key={ingredient.id}
                                id={ingredient.id}
                                family={ingredient.family}
                                name={ingredient.name}
                                icon={ingredient.icon}
                                season={ingredient.season}
                            />
                              )
                    }
                </div>
            </div>
        )
    }    
}

export default CalendarPage;