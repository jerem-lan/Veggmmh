import React, { Component, Fragment } from 'react';
import axios from 'axios';
import AlertMessage from '../AlertMessage';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import inputControls from '../../services/inputControls';

class RegistrationPage extends Component {

    state = { 
        lastname: '',
        firstname: '',
        postcode: '',
        email: '',
        username: '',
        password: '',
        error: '',
        errorFront: ''
    }

    //Récupere les informations tapées dans le formulaire
    handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        if(name === "password") {
            this.setState({ [name]: inputControls.passwordVerif(value) })
        } else {
            this.setState({ [name]: value })
        }

    }

    handleSubmit = async event => {
        event.preventDefault()
        if (inputControls.spaceVerif(this.state.lastname) && inputControls.spaceVerif(this.state.firstname)) {
            const user = {
                lastname: inputControls.truncString(this.state.lastname),
                firstname: inputControls.truncString(this.state.firstname),
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
                    toast.error("😞 Il y a des erreurs dans votre formulaire.")    
                }     
            };   
        }else{
            this.setState({errorFront : "Vous n'avez rentré que des espaces dans l'un des champs"})
        }
    }

    render() { 
        const BackWithRouter = this.props.BackWithRouter
        return (
            <Fragment>
                <BackWithRouter />
                <div className="container container--registration">
                    <form className='form' onSubmit={this.handleSubmit}>
                    {this.state.errorFront ? <AlertMessage message = {this.state.errorFront}  /> : ""}
                        <input 
                            name='lastname' 
                            value={this.state.lastname} 
                            onChange={this.handleChange}
                            className="subscriptionInput" 
                            type="text" 
                            placeholder="Nom" 
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
                            required
                        />
                        {this.state.error.username ? <AlertMessage message = { this.state.error.username }  /> : ""}
                        <input 
                            name='password' 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            className="subscriptionInput" 
                            type="password" 
                            pattern= "^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$"
                            placeholder="Mot de passe" 
                            required
                        />
                        <p>- Votre mot de passe doit contenir au moins 8 caractères.</p>
                        <p>- Votre mot de passe doit contenir au moins une minuscule.</p>
                        <p>- Votre mot de passe doit contenir au moins une majuscule.</p>
                        <p>- Votre mot de passe doit contenir au moins un caractère spécial parmis : $ @ % * + - _ !</p>
                        {this.state.error.password ? <AlertMessage message = { this.state.error.password }  /> : ""}
                        
                            <button className="btn" type="submit">Créer un compte</button> 
                    </form>
                    <Link to="/login" className="psswrdForgotten">J'ai déjà un compte</Link>
                </div>
            </Fragment>
        );
    }
}

export default RegistrationPage;