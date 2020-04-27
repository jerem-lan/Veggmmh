import React, { Component } from 'react';
import axios from 'axios';
import AlertMessage from '../AlertMessage';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



class RegistrationPage extends Component {

    state = { 
        lastname: '',
        firstname: '',
        postcode: '',
        email: '',
        username: '',
        password: '',
        error: ''
    }

    //Récupere les informations tapées dans le formulaire
    handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        this.setState({ [name]: value })
    }

    handleSubmit = async event => {
        event.preventDefault()

        const user = {
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            postcode: this.state.postcode,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };

        try {await axios
            .post('http://localhost:8000/api/users', user) 
            this.setState({
                lastname: '',
                firstname: '',
                postcode: '',
                email: '',
                username: '',
                password: '',
                error: ''    
            })
            toast.info("🌱 Bienvenue jeune pousse ! 🌱")
            this.props.history.replace('/login')
        } catch(error) {
            const {violations} = error.response.data
            if(violations){
                const apiErrors = {};
                violations.map(violation => 
                    apiErrors[violation.propertyPath] = violation.message  
                );     
                this.setState({
                    error: apiErrors
                })
                toast.error("Champs manquants requis.")    
            }     
        };   
    }

    render() { 
        return (
            <div className="container container--registration">
                <form className='form' onSubmit={this.handleSubmit}>
                    <input 
                        name='lastname' 
                        value={this.state.lastname} 
                        onChange={this.handleChange}
                        className="subscriptionInput" 
                        type="text" 
                        placeholder="Nom" 
                        /*pattern="[A-Z][a-z]"*/
                        required 
                    />
                        {this.state.error.lastname ? <AlertMessage message = {this.state.error.lastname}  /> : ""}
                    <input 
                        name='firstname' 
                        value={this.state.firstname} 
                        onChange={this.handleChange} 
                        className="subscriptionInput" 
                        type="text" 
                        placeholder="Prénom" 
                        /*pattern='[A-Za-z-]{1,}'*/ 
                        required
                    />
                    {this.state.error.firstname ? <AlertMessage message = { this.state.error.firstname }  /> : ""}
                    <input 
                        name='postcode' 
                        value={this.state.postcode} 
                        onChange={this.handleChange} 
                        className="subscriptionInput" 
                        type="text" 
                        placeholder="Code postal" 
                        // pattern="[0-9]{5}"
                        required
                    />
                    {this.state.error.postcode ? <AlertMessage message = { this.state.error.postcode }  /> : ""}
                    <input 
                        name='email' 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        className="subscriptionInput inputBottomMargin" 
                        type="email" 
                        placeholder="Adresse mail"
                        required
                    />
                    {this.state.error.email ? <AlertMessage message = { this.state.error.email }  /> : ""}
                    <input 
                        name='username' 
                        value={this.state.username} 
                        onChange={this.handleChange} 
                        className="subscriptionInput" 
                        type="text" 
                        placeholder="Nom d'utilisateur" 
                        pattern='[A-Za-z-]{1,}' 
                        required
                    />
                    {this.state.error.username ? <AlertMessage message = { this.state.error.username }  /> : ""}
                    <input 
                        name='password' 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        className="subscriptionInput" 
                        type="password" 
                        placeholder="Mot de passe" 
                        /*pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"*/ 
                        required
                    />
                    {this.state.error.password ? <AlertMessage message = { this.state.error.password }  /> : ""}
                    
                        <button className="btn" type="submit">Créer un compte</button> 
                </form>
                <Link to="/login" className="psswrdForgotten">J'ai déjà un compte</Link>
            </div>
        );
    }
}

export default RegistrationPage;