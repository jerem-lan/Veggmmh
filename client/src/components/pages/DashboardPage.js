import React, { Component } from 'react';
import featureBlocksData from '../../data/featureBlocksData';
import ProfilCartouche from '../ProfilCartouche';
import FeatureBlock from '../FeatureBlock';
import authApi from '../../services/authApi';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import DashBoardLoader from '../../loaders/DashBoardLoader';
import { toast } from 'react-toastify';

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
            loading: true
    }
    
    componentDidMount() {
        if (authApi.isAuthenticated()) {   
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
        this.setState({ [name]: value })
    }

    changePersonnalInfo = (event) => {
        if( authApi.isAuthenticated()) {
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
            })
            toast.info("Vos données ont été modifiées avec succès 👌")
        }
    }

    changePassword = (event) => {
        if( authApi.isAuthenticated()) {
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
                            <input name='email' value={this.state.email} onChange={this.handleChange} className="subscriptionInput" type="email" placeholder={this.state.email} required/>
                            <button className="btn" type="submit" onClick={this.changePersonnalInfo}>Valider les changements</button>
                        </form>
                        <form className='form'>
                            <input name='password' value={this.state.password} onChange={this.handleChange} className="subscriptionInput password" type="password" placeholder="Nouveau mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                            <p className="passwordWarning">Votre mot de passe doit contenir au moins 8 caractères dont une minuscule, une  majuscule et un caractère spécial parmis $ @ % * + - _ !</p>
                            <input name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} className="subscriptionInput" type="password" placeholder="Confirmer le mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                            {this.state.error && <p className="invalid-feedback">{this.state.error}</p>}
                            <button className="btn" type="submit" onClick={this.changePassword}>Modifier mon mot de passe</button>
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