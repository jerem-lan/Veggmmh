import React, { Component, Fragment } from 'react'
import ProfilCartouche from './ProfilCartouche'
import Header from './Header'
import AlertMessage from './AlertMessage'
import FeatureBlock from './FeatureBlock'
import featureBlocksData from '../BDD/featureBlocksData'
import AuthApi from '../services/authApi';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class DashboardPage extends Component {
   
    state = { 
        user: []
    }

    componentDidMount() {
        const token = window.localStorage.getItem("authToken")
        const  decoded = jwtDecode(token)
        const id = decoded.id
        
        axios
            .get("http://127.0.0.1:8000/api/users/"+id)
            .then(res => {
                const user = res.data;      
                this.setState({ user });
            }) 
    }
    

    //Récupere les informations tapées dans le formulaire
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        const username = this.state.user.firstname + " " + this.state.user.lastname
        // const { featureBlocksData }  = this.state
        if ( AuthApi.setup() ) {     
            return (
                <Fragment>
                <Header/>
                <div className="container container--dashboard">
                    <div className="profilContainer">
                        <ProfilCartouche username={username}/>
                        <div className="edit--personnalInfos">
                        <div className="title">
                            <svg className="icon--title" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 5L7 9 2.5 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <p className='title--category'>Modifier mes informations</p>
                        </div>
                        <form className='form'>
                            <input name='postcode' value={this.state.user.postcode} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder={this.state.user.postcode}  pattern="[0-9]{5}" required/>
                            <input name='email' value={this.state.user.email} onChange={this.handleChange} className="subscriptionInput" type="email" placeholder={this.state.user.email} required/>
                            <input name='username' value={this.state.user.username} onChange={this.handleChange} className="subscriptionInput" type="text" placeholder={this.state.user.username} pattern='[A-Za-z-]{1,}' required/>
                            <input name='password' value="" className="subscriptionInput" type="password" placeholder="Nouveau mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                            <input name='password' value="" className="subscriptionInput" type="password" placeholder="Confirmer le mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                            <AlertMessage message={this.state.alertMessage}/>
                            <button className="btn" type="submit">valider les changements</button>
                        </form>
                    </div>
                    </div>
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
                )}
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