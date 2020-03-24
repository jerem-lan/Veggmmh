import React, { Component } from 'react';

class RegistrationPage extends Component {

    render() {
        return (
            <>
                <div className="Content">
                    <form className=''>
                        <h1>Register</h1>
                        <input name='lastname' value={this.state.lastname} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Nom" pattern="[A-Z][a-z]" required/>
                        <input name='firstname' value={this.state.firstname} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Prénom" pattern='[A-Za-z-]{1,}' required/>
                        <input name='postcode' value={this.state.postcode} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Code postal" pattern="[0-9]{5}" required/>
                        <input name='email' value={this.state.email} onChange={this.handleChange} className="subscriptionInput" type="email" placeholder="Adresse mail" required/>
                        <input name='username' value={this.state.username} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Nom d'utilisateur" pattern='[A-Za-z-]{1,}' required/>
                        <input name='password' value="" className="subscriptionInput" type="password" placeholder="Mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                        <input name='password' value="" className="subscriptionInput" type="password" placeholder="Confirmer le mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                        <p>Erreur</p>
                        <button type='submit'>S'inscrire</button>
                    </form>
                    <p>Mot de passe oublié ?</p>
                    <p>Créer un compte</p>
                </div>
            </>
        );
    }
}

export default RegistrationPage;