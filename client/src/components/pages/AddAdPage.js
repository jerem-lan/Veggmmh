import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AlertMessage from '../AlertMessage';
import inputControls from '../../services/inputControls';

class AddAdPage extends Component {
    state = {
        title: '',
        content: '',
        postcode: '',
        errors: '',
        errorFront: ''
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = async event => {
        event.preventDefault()
        //on recupère le token
        const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if (inputControls.spaceVerif(this.state.title) && inputControls.spaceVerif(this.state.content) && inputControls.spaceVerif(this.state.postcode)) {
            const ad = {
                title: inputControls.inputVerif(this.state.title),
                content: inputControls.inputVerif(this.state.content),
                postcode: inputControls.inputVerif(this.state.postcode)
            };
            //on donne le header et les données à axios
            try { await axios.post( 
                'http://localhost:8000/api/ads',
                ad,
                config
            );

                this.setState({
                    title: '',
                    content: '',
                    postcode: ''
                })
                toast.info("Votre annonce a été créée avec succès 👌")
                this.props.history.replace("/liste-annonces");
            }catch (error) {
                const {violations} = error.response.data
                if(violations){
                    const apiErrors = {};
                    violations.map(violation => 
                        apiErrors[violation.propertyPath] = violation.message
                        
                    );     
                    this.setState({
                        errors: apiErrors
                    })
                    toast.error("😞 Il y a des erreurs dans votre formulaire ")    
                } 
            }
        }else {
            this.setState({errorFront : "Vous n'avez rentré que des espaces dans l'un des champs"})
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="SectionTitle">Déposer une annonce</h2>
                <form className='form' onSubmit= {this.handleSubmit}>
                {this.state.errorFront ? <AlertMessage message = {this.state.errorFront}  /> : ""}
                    <span>


                        <label className="label" htmlFor="title">Titre de mon annonce</label>
                        <input
                            className='input'
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Ex : Botte de radis du potager"
                            required />
                        {this.state.errors.title ? <AlertMessage message = { this.state.errors.title }  /> : ""}

                        <label className="label" htmlFor="description">Description de mon annonce</label>
                        <textarea
                            className="textarea textarea--adDescription"
                            name='content'
                            value={this.state.content}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Ex: Propose quelques bottes de radis provenant de mon potager, idéalement contre quelques pommes ou de la rhubarbe..."
                            required
                        />
                        {this.state.errors.content ? <AlertMessage message = { this.state.errors.content }  /> : ""}

                        <label className="label" htmlFor="localisation">Localisation</label>
                        <input
                            className='input'
                            name='postcode'
                            value={this.state.postcode}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Ex : 59370"
                            required />
                        {this.state.errors.postcode ? <AlertMessage message = { this.state.errors.postcode }  /> : ""}
                    </span>
                    <button className="btn btn--validate" type='submit' >Envoyer mon annonce</button>
                </form>
            </div>
        );
    }
}

export default AddAdPage;