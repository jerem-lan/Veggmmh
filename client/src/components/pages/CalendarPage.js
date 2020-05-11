import React, { Component, Fragment } from 'react'
import axios from "axios";
import FruitVegBlock from '../FruitVegBlock'
import DefaultLoader from '../../loaders/DefaultLoader';

class CalendarPage extends Component {
   
    state = {
        fruitsAndVeggies: [], // tous les fruits/légumes récupérés depuis l'API
        itemSelection: [], // les fruits/legumes trouvés après recherche par mois de disponibilité
        itemSelectionDeux: [], // les fruits/legumes trouvés après recherche par saisie de nom
        search: '', // le mot que l'on saisi dans l'input pour chercher un item
        loading: true
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
                    fruitsAndVeggies: fruitsAndVeggies,
                    loading : false
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
        this.setState({ search: event.target.value})
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
        const itemSelectionDeux = this.state.fruitsAndVeggies.filter(item => 
            item.name.toLowerCase().includes(this.state.search.toLowerCase())
        )

        return (
            <Fragment>
                {loading && <DefaultLoader />} 
                {!loading && <>
                    <div className="container">
                        <h2 className="SectionTitle">Calendrier des fruits et légumes locaux de saison</h2>
                        <label className="label">Rechercher par aliment</label>
                        <input className="input input--search" type='text' onChange={this.handleChange} value={this.state.search} placeholder="Ex: tomate"/>
                        <div className="fruitVegBlocks">
                            {this.state.search === "" ? <></> : 
                                itemSelectionDeux.length === 0 ? <> Aucun résultat </> : itemSelectionDeux.map((ingredient) => 
                                    <FruitVegBlock
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
                        <div class="select">
                            <select name="month" id="month" size="1" onChange={this.handleMonth}/>
                        </div>   
                        <div className="fruitVegBlocks" >
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
                </>}
            </Fragment>
        )
    }
}

export default CalendarPage;