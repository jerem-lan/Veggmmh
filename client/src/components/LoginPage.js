import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'

import Header from './Header'

class LoginPage extends Component {

    state = { 
        username: '',
        password: '',
        goToApp: false
    }

    goToApp = event => {
        event.preventDefault() //evite le rechargement de page
        this.setState({ goToApp: true })
    }

    //Récupere les informations tapées dans le formulaire
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        // Redirige vers la bonne url
        if (this.state.goToApp) {
            return <Redirect push to={`/dashboard/${this.state.username}`} />
        }
        // Sinon on rend le formulaire
        return (
            <Fragment>
                <Header/>
                <div className="Content">
                        <form className='form' onSubmit={this.goToApp} >
                            <input name='username' value={this.state.username} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder="Nom d'utilisateur" pattern='[A-Za-z-]{1,}' required/>
                            <input name='password' value={this.state.password} onChange={this.handleChange} className="subscriptionInput" type="password" placeholder="Mot de passe"/>
                            <p className='alert--error'>
                                <svg className='icon--error' viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6.41" cy="6.59" r="5.91" stroke="#E94C4C"/><path d="M6.42 8.05c-.26 0-.4-.15-.42-.43l-.33-4.15a.79.79 0 01.18-.59.71.71 0 01.56-.24.73.73 0 01.73.82l-.32 4.16c-.02.28-.15.43-.4.43zm-.08 2.5a.71.71 0 01-.5-.18.71.71 0 01-.18-.5v-.2c0-.22.06-.38.17-.5a.69.69 0 01.5-.17h.16c.21 0 .38.06.5.18.11.1.17.27.17.5v.18c0 .22-.06.4-.18.51-.11.12-.28.17-.5.17h-.14z" fill="#E94C4C"/>
                                </svg>
                                Identifiants incorrects
                            </p>
                            <button className="btn" type="submit">se connecter</button>
                            {/* <button className="Button--subscription" type='submit'>
                            <svg width="25" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.152 8.864c-.137-.149-.216-.244-.301-.329-1.213-1.223-2.433-2.44-3.636-3.67-.972-.994-1.092-2.518-.307-3.613C11.74.084 13.243-.333 14.5.284c.311.157.595.363.84.61 2.927 2.916 5.847 5.838 8.76 8.766 1.2 1.206 1.199 2.934-.006 4.142a4296.7 4296.7 0 01-8.569 8.563c-1.191 1.187-2.965 1.195-4.127.039-1.134-1.13-1.107-2.9.075-4.093 1.121-1.133 2.25-2.26 3.383-3.38.082-.08.188-.136.283-.203l-.054-.127H2.971c-1.392 0-2.582-.908-2.887-2.182-.44-1.837.904-3.541 2.82-3.55 2.526-.012 5.052-.004 7.578-.004h4.67z" fill="#FBFCFF"/></svg>
                            </button> */}
                        </form>
                        <p className="psswrdForgotten">Mot de passe oublié ?</p>
                </div>
            </Fragment>
        );
    }
}

export default LoginPage;