import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import AlertMessage from '../AlertMessage';
import AuthApi from '../../services/authApi';
import { toast } from 'react-toastify';
import inputControls from '../../services/inputControls';


class LoginPage extends Component {
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
        if(name !== "username") {
            this.setState({ [name]: inputControls.passwordVerif(value) })
        } else {
            this.setState({ [name]: inputControls.specialVerif(value) })
        }
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
                        <button 
                            className="btn" 
                            type="submit">
                                Se connecter
                        </button>
                    </form>
                    {/* <Link to="/login" className="psswrdForgotten">Mot de passe oublié ?</Link> */}
                </div>
            </Fragment>
        );
    }
}

export default LoginPage;