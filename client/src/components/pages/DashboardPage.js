import React, { Component, Fragment } from 'react'

import ProfilCartouche from '../ProfilCartouche'
import Header from '../Header'
import AlertMessage from '../AlertMessage'
import FeatureBlock from '../FeatureBlock'
import featureBlocksData from '../../data/featureBlocksData'

import AuthApi from '../../services/authApi';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { Redirect } from 'react-router-dom'


class DashboardPage extends Component {
   
    state = { 
            username : "",
            firstname : "",
            lastname : "",
            postcode : "",
            email : "",
            password : "",
            confirmPassword : "",
            redirect : false,
            error : ""
    }

    componentDidMount() {
        const token = window.localStorage.getItem("authToken")
        const decoded = jwtDecode(token)
        const id = decoded.id
        
        axios
            .get("http://127.0.0.1:8000/api/users/"+id)
            .then(res => {
                const user = res.data;
                this.setState({ 
                    firstname : user.firstname,
                    lastname : user.lastname,
                    username : user.username,
                    postcode : user.postcode,
                    email : user.email
                });
            })
    }
    
    //Récupere les informations tapées dans le formulaire
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    changePersonnalInfo = (event) => {
        event.preventDefault()
        const token = window.localStorage.getItem("authToken")
        const decoded = jwtDecode(token)
        const id = decoded.id

        axios({
            method: 'put',
            url: "http://127.0.0.1:8000/api/users/"+id,
            data: {
              postcode : this.state.postcode,
              email: this.state.email,
              username : this.state.username
            }
        }).then(() => this.setState({ redirect: true }))
        .then(() => this.setState({ redirect: false }));
    }

    changePassword = (event) => {
        event.preventDefault()
        if(this.state.password === this.state.confirmPassword) {
            const token = window.localStorage.getItem("authToken")
            const decoded = jwtDecode(token)
            const id = decoded.id

            axios({
                method: 'put',
                url: "http://127.0.0.1:8000/api/users/"+id,
                data: {
                password : this.state.password
                }
            }).then(() => this.setState({ redirect: true }))
            .then(() => this.setState({ redirect: false }));

        this.setState({password : "", confirmPassword : ""})
        } else {
            return this.setState({ error: "Les mots de passe ne sont pas identiques. Veuillez recommencer" });
        }
    }
    handleLogout = () => {
        AuthApi.logout();
    } 

    render() {
        const username = this.state.firstname + " " + this.state.lastname
        // const { featureBlocksData }  = this.state
        if ( AuthApi.setup() ) {
            if(this.state.redirect) {
                return <Redirect push to={`/dashboard/${this.state.username}`} />
            }     
            return (
                <Fragment>
                    <Header handleLogout={this.handleLogout} />
                    <div className="container container--dashboard">
                
                    <div className="profilContainer">
                        <ProfilCartouche username={username}/>
                        <div className="edit--prsonnalInfos">
                        <div className="title">
                            <svg className="icon--title" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 5L7 9 2.5 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <p className='title--category'>Modifier mes informations</p>
                        </div>
                        <form className='form'>
                            <input name='postcode' value={this.state.postcode} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder={this.state.postcode}  pattern="[0-9]{5}" required/>
                            <input name='email' value={this.state.email} onChange={this.handleChange} className="subscriptionInput" type="email" placeholder={this.state.email} required/>
                            <input name='username' value={this.state.username} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder={this.state.username} pattern='[A-Za-z-]{1,}' required/>
                            
                            <button className="btn" type="submit" onClick={this.changePersonnalInfo}>Valider les changements</button>
                            
                            <input name='password' value={this.state.password} onChange={this.handleChange} className="subscriptionInput" type="password" placeholder="Nouveau mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                            <input name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} className="subscriptionInput" type="password" placeholder="Confirmer le mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                            
                            
                            {this.state.error && <p className="invalid-feedback">{this.state.error}</p>}

                            
                            <button className="btn" type="submit" onClick={this.changePassword}>Modifier le mot de passe</button>
                        </form>
                    </div>
                    </div>
                    
                    <div className="featureBlocks">
                        <div className="featureBlock"><p className="title">Mon espace</p></div>
                        {
                            Object.keys(featureBlocksData)
                                .map(key => <FeatureBlock
                                    key={key}
                                    id={key} 
                                    featureBlocksData={featureBlocksData}/>)
                        }
                    </div>
                </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Header/>
                <div className="container container--dashboard">
                    <div className="featureBlocks">
                        {
                            Object.keys(featureBlocksData)
                                .map(key => <FeatureBlock
                                    key={key}
                                    id={key} 
                                    featureBlocksData={featureBlocksData}/>)
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
       
}

export default DashboardPage;