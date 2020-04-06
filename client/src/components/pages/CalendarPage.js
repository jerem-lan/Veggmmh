import React, { Component, Fragment } from 'react'
import axios from "axios";
import Header from '../Header'

import FruitVegBlock from '../FruitVegBlock'

import AuthApi from '../../services/authApi';




class CalendarPage extends Component {
   
    state = {
        fruitsAndVeggies: []
    }

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
                console.log(fruitsAndVeggies)
                this.setState({ fruitsAndVeggies: fruitsAndVeggies })
            })
            .catch(error => console.log(error.response))
    }

    handleLogout = () => {
        AuthApi.logout();
    } 


    render() {
        return (
            <Fragment>
                <Header handleLogout={this.handleLogout}/>
                <div>
                    <input type="text"/>
                    {
                        this.state.fruitsAndVeggies.map((ingredient) => 
                            <FruitVegBlock
                                id={ingredient.id}
                                family={ingredient.family}
                                name={ingredient.name}
                            />)
                    }
                </div>
            </Fragment>
        )
    }    
}

export default CalendarPage;