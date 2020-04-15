import React, { Component } from 'react'

import ProfilCartouche from '../ProfilCartouche'
import FeatureBlock from '../FeatureBlock'
import featureBlocksData from '../../data/featureBlocksDataConnected'

import authApi from '../../services/authApi';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { Redirect, NavLink } from 'react-router-dom';


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
        if ( authApi.isAuthenticated() ) {   
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
    }
    
    //Récupere les informations tapées dans le formulaire de Modification des infos
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    changePersonnalInfo = (event) => {
        // Prevent button click from submitting form
        event.preventDefault()
        const token = window.localStorage.getItem("authToken")
        const decoded = jwtDecode(token)
        const id = decoded.id
        axios({
            method: 'put',
            url: "http://127.0.0.1:8000/api/users/"+id,
            data: {
              postcode : this.state.postcode,
              email: this.state.email            
            }
        }).then(() => this.setState({ redirect: true }))
        .then(() => this.setState({ redirect: false }));
    }

    changePassword = (event) => {
        event.preventDefault()
        if(this.state.password !== "" && this.state.confirmPassword !== "") {
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
                })
                this.setState({password : "", confirmPassword : ""})
            } else {
                return this.setState({ error: "Mots de passe manquants ou non-similaires." });
            }
        } 
    }
    
    render() {
        const username = this.state.firstname + " " + this.state.lastname
        //Si connecté, affiche : 
        if ( authApi.isAuthenticated() ) {   
            return (
                <div className="container container--dashboard">
                    <ProfilCartouche username={username}/>
                    <div className="profilNav">
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
                </div>
            )
        }
        
        //Sinon, affiche : 
        return (
            <div className="container container--dashboard">
                <ProfilCartouche username="jeune pousse !"/>
                <div className="profilNav">
                    <div className="featureBlocks">
                        {
                            Object.keys(featureBlocksData)
                                .filter(key => featureBlocksData[key].isAnonym === true )
                                .map((key) => <FeatureBlock
                                                key={key}
                                                id={key} 
                                                featureBlocksData={featureBlocksData}/>)
                        }
                    </div>
                </div>
            </div>
        )
    }
       
}

export default DashboardPage;