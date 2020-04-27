import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../AlertMessage';
import AuthApi from '../../services/authApi';
import { toast } from 'react-toastify';


class LoginPage extends Component {
    //Props : onLogin
    state= { 
        username: '',
        password: '',
        validation: false,
        error: ''  
    }

    goToApp = async event => {
        event.preventDefault() //evite le rechargement de page
        try {
            this.setState ({ validation: await AuthApi.authenticate(this.state) });
            this.props.onLogin(true)
            toast.success( `Heureux de te voir 🥑`)
            this.props.history.replace("/dashboard") 
        } catch  {
            this.setState({ error: "Identifiants incorrects." });
            toast.error("😞 Identifiants incorrects.");
        }      
    };
    //Récupere les informations tapées dans le formulaire
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        const BackWithRouter = this.props.BackWithRouter
        return (
            <Fragment>
                <BackWithRouter />
                <div className="container container--login">
                    <form className='form' onSubmit={this.goToApp} >
                        <input 
                            name='username' 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                            className={"subscriptionInput" + (this.state.error && " is-invalid")}
                            type="text" 
                            placeholder="Nom d'utilisateur" 
                            //pattern='[A-Za-z-]{1,}' 
                            required/>

                        <input 
                            name='password' 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            className={"subscriptionInput" + (this.state.error && " is-invalid")}
                            type="password" 
                            placeholder="Mot de passe"
                            required/>

                        {this.state.error ? <AlertMessage message = { this.state.error }  /> : ""}
                        {/* {this.state.error && 
                            <p className="alert--error">
                                <svg className='icon--error' viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6.41" cy="6.59" r="5.91" stroke="#E94C4C"/><path d="M6.42 8.05c-.26 0-.4-.15-.42-.43l-.33-4.15a.79.79 0 01.18-.59.71.71 0 01.56-.24.73.73 0 01.73.82l-.32 4.16c-.02.28-.15.43-.4.43zm-.08 2.5a.71.71 0 01-.5-.18.71.71 0 01-.18-.5v-.2c0-.22.06-.38.17-.5a.69.69 0 01.5-.17h.16c.21 0 .38.06.5.18.11.1.17.27.17.5v.18c0 .22-.06.4-.18.51-.11.12-.28.17-.5.17h-.14z" fill="#E94C4C"/>
                                </svg>
                                {this.state.error}
                            </p>
                        } */}
                        <button 
                            className="btn" 
                            type="submit">
                                Se connecter
                        </button>
                    </form>
                    <Link to="/login" className="psswrdForgotten">Mot de passe oublié ?</Link>
                </div>
            </Fragment>
        );
    }
}

export default LoginPage;