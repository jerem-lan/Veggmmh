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
        errors: '' 
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
                errors: ''    
            })
            this.setState({
                errors: ""
            })
            toast.info("Bienvenue parmis nous !!")
            this.props.history.replace('/login')
        } catch(error) {
            const {violations} = error.response.data
            if(violations){
                const apiErrors = {};
                violations.map(violation => 
                    apiErrors[violation.propertyPath] = violation.message
                    
                );     
                this.setState({
                    errors: apiErrors
                })
                toast.error("Des erreurs dans votre formulaire !!")    
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
                            placeholder="Nom" /*pattern="[A-Z][a-z]"*/ 
                        />
                         {this.state.errors.lastname ? <AlertMessage message = {this.state.errors.lastname}  /> : ""}
                        <input 
                            name='firstname' 
                            value={this.state.firstname} 
                            onChange={this.handleChange} 
                            className="subscriptionInput" 
                            type="text" 
                            placeholder="Prénom" /*pattern='[A-Za-z-]{1,}'*/ 
                        />
                        {this.state.errors.firstname ? <AlertMessage message = { this.state.errors.firstname }  /> : ""}
                        <input 
                            name='postcode' 
                            value={this.state.postcode} 
                            onChange={this.handleChange} 
                            className="subscriptionInput" 
                            type="text" 
                            placeholder="Code postal" 
                            // pattern="[0-9]{5}" 
                        />
                        {this.state.errors.postcode ? <AlertMessage message = { this.state.errors.postcode }  /> : ""}
                        <input 
                            name='email' 
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            className="subscriptionInput inputBottomMargin" 
                            type="email" 
                            placeholder="Adresse mail" 
                        />
                        {this.state.errors.email ? <AlertMessage message = { this.state.errors.email }  /> : ""}
                        <input 
                            name='username' 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            className="subscriptionInput" 
                            type="text" 
                            placeholder="Nom d'utilisateur" 
                            pattern='[A-Za-z-]{1,}' 
                        />
                        {this.state.errors.username ? <AlertMessage message = { this.state.errors.username }  /> : ""}
                        <input 
                            name='password' 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            className="subscriptionInput" 
                            type="password" 
                            placeholder="Mot de passe" /*pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"*/ 
                        />
                        {this.state.errors.password ? <AlertMessage message = { this.state.errors.password }  /> : ""}
                        
                            <button className="btn" type="submit" >créer un compte</button> 
                            <Link to="/login" className="psswrdForgotten">j'ai déjà un compte</Link>
                        
                    </form>
                </div>
          
        );
    }
}

export default RegistrationPage;