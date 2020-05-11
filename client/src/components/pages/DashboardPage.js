import React, { Component } from 'react';
import featureBlocksData from '../../data/featureBlocksData';
import ProfilCartouche from '../ProfilCartouche';
import FeatureBlock from '../FeatureBlock';
import authApi from '../../services/authApi';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import DashBoardLoader from '../../loaders/DashBoardLoader';
import { toast } from 'react-toastify';
import AlertMessage from '../AlertMessage';
import inputControls from '../../services/inputControls';
import { USERS_URL } from '../../services/config';

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
            error : "",
            passwordError : "",
            loading: true
    }
    
    componentDidMount() {
        if (authApi.isAuthenticated()) {   
            const token = window.localStorage.getItem("authToken")
            const decoded = jwtDecode(token)
            const id = decoded.id     
            axios
                .get(USERS_URL + '/' + id)
                .then(res => {
                    const user = res.data;
                    this.setState({ 
                        firstname : user.firstname,
                        lastname : user.lastname,
                        username : user.username,
                        postcode : user.postcode,
                        email : user.email,
                        loading: false
                    });

                })
        } else {
            this.setState( {loading: false} )
        }
    }
    
    // Récupere les informations tapées dans le formulaire de Modification des infos
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: inputControls.passwordVerif(value) })
    }

    changePersonnalInfo = (event) => {
        if( authApi.isAuthenticated()) {
            event.preventDefault()
            const token = window.localStorage.getItem("authToken")
            const decoded = jwtDecode(token)
            const id = decoded.id
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios.put(
                USERS_URL + '/' + id,
                {
                postcode : this.state.postcode,
                email: this.state.email            
                },
                config
            ).then((response) => {
                toast.info("Vos données ont été modifiées avec succès 👌")
              }, (error) => {
                const {violations} = error.response.data
                if(violations){
                    const apiErrors = {};
                    violations.map(violation => 
                        apiErrors[violation.propertyPath] = violation.message  
                    );     
                    this.setState({
                        error: apiErrors
                    })
                    toast.error("😞 Il y une erreur dans votre formulaire.")    
                }
            });
        }
    }

    handleChangePassword = (event) => {
        event.preventDefault()
        if( authApi.isAuthenticated()) {
            if(this.state.password !== "" && this.state.confirmPassword !== "") {
                if(this.state.password === this.state.confirmPassword) {
                    const token = window.localStorage.getItem("authToken")
                    const decoded = jwtDecode(token)
                    const id = decoded.id
                    const config = {
                            headers: { Authorization: `Bearer ${token}` }
                    };

                    axios.put(
                        USERS_URL + '/' + id,
                        {password : this.state.password},
                        config
                    ).then((response) => {
                        this.setState({password : "", confirmPassword : ""})
                        toast.info("Votre mot de passe a bien été modifié. 👌")    
                        if(this.state.error.password) {
                            this.setState({error : ""})
                        }
                      }, (error) => {
                        console.log(error);
                        const {violations} = error.response.data
                        if(violations){
                            const apiErrors = {};
                            violations.map(violation => 
                                apiErrors[violation.propertyPath] = violation.message  
                            );     
                            this.setState({
                                passwordError: apiErrors
                            })
                            toast.error("😞 Il y a des erreurs dans votre formulaire.")    
                        }
                      });
                } else {
                    return this.setState({ passwordError: "Mots de passe manquants ou non-similaires." });
                }
            }
        }
    }
    
    render() {
        const username = this.state.firstname + " " + this.state.lastname
        let loading = this.state.loading 
        return (
            //     {!loading && !authApi.isAuthenticated() && <> 
            //         <BreadCrumbs/>
            //     </>}
            <div className="container container--dashboard"> 

                {loading && <DashBoardLoader />}      
                {((!loading) && (authApi.isAuthenticated()))  && <>
                    <ProfilCartouche isConnected={true} username={username}/>
                    <div className="edit--prsonnalInfos">
                        <form className='form'>
                            <input name='postcode' value={this.state.postcode} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder={this.state.postcode}  pattern="[0-9]{5}" required/>
                            {this.state.error.postcode ? <AlertMessage message = {this.state.error.postcode}  /> : ""}
                            <input name='email' value={this.state.email} onChange={this.handleChange} className="subscriptionInput" type="email" placeholder={this.state.email} required/>
                            {this.state.error.email ? <AlertMessage message = {this.state.error.email}  /> : ""}
                            <button className="btn" type="submit" onClick={this.changePersonnalInfo}>Valider les changements</button>
                        </form>
                        <form className='form' onSubmit={this.handleChangePassword}>
                            <input name='password' value={this.state.password} onChange={this.handleChange} className="subscriptionInput password" type="password" placeholder="Nouveau mot de passe" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$" />
                            <p className="passwordWarning">Votre mot de passe doit contenir au moins 8 caractères dont une minuscule, une  majuscule et un caractère spécial parmis $ @ % * + - _ !</p>
                            <input name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} className="subscriptionInput" type="password" placeholder="Confirmer le mot de passe"  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$"/>
                            {this.state.passwordError.password ? <AlertMessage message = {this.state.passwordError.password}  /> : ""}
                            <button className="btn" type="submit" >Modifier mon mot de passe</button>
                        </form>
                    </div>
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
                    </div> </>}

            {((!loading) && (!authApi.isAuthenticated())) && <>
                    <ProfilCartouche isConnected={false} username="jeune pousse !"/>
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
                </>}
            </div>
        )
    }  
}

export default DashboardPage;