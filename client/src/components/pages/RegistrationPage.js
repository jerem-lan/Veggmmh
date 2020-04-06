import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Header from '../Header'

class RegistrationPage extends Component {

    state = { 
        lastname: '',
        firstname: '',
        postcode: '',
        email: '',
        username: '',
        password: ''
    }

    //Récupere les informations tapées dans le formulaire
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const user = {
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            postcode: this.state.postcode,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };

        console.log(user)

        axios
            .post('http://localhost:8000/api/users', user)
            .then((res) => {
                //On traite la suite une fois la réponse obtenue 
                console.log(res.data);
                console.log(res.status);
                console.log(res.statusText);
            })
            .catch((error) => {
            //On traite ici les erreurs éventuellement survenues
            console.log(error);
            });

        this.setState({
            lastname: '',
            firstname: '',
            postcode: '',
            email: '',
            username: '',
            password: ''    
        })
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="Content">
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input name='lastname' value={this.state.lastname} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Nom" /*pattern="[A-Z][a-z]"*/ required/>
                        <input name='firstname' v alue={this.state.firstname} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Prénom" /*pattern='[A-Za-z-]{1,}'*/ required/>
                        <input name='postcode' value={this.state.postcode} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Code postal" pattern="[0-9]{5}" required/>
                        <input name='email' value={this.state.email} onChange={this.handleChange} className="subscriptionInput inputBottomMargin" type="email" placeholder="Adresse mail" required/>
                        <input name='username' value={this.state.username} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Nom d'utilisateur" pattern='[A-Za-z-]{1,}' required/>
                        <input name='password' value={this.state.password} onChange={this.handleChange} className="subscriptionInput" type="password" placeholder="Mot de passe" /*pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"*/ />

                        <div className='alert--error'>
                            <svg className='icon--error' viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6.41" cy="6.59" r="5.91" stroke="#E94C4C"/><path d="M6.42 8.05c-.26 0-.4-.15-.42-.43l-.33-4.15a.79.79 0 01.18-.59.71.71 0 01.56-.24.73.73 0 01.73.82l-.32 4.16c-.02.28-.15.43-.4.43zm-.08 2.5a.71.71 0 01-.5-.18.71.71 0 01-.18-.5v-.2c0-.22.06-.38.17-.5a.69.69 0 01.5-.17h.16c.21 0 .38.06.5.18.11.1.17.27.17.5v.18c0 .22-.06.4-.18.51-.11.12-.28.17-.5.17h-.14z" fill="#E94C4C"/>
                            </svg>
                            <p>Champs requis manquants</p>
                        </div>
                        <button className="btn" type="submit">créer un compte</button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default RegistrationPage;