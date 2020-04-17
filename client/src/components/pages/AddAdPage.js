import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AlertMessage from '../AlertMessage';

class AddAdPage extends Component {
    state = {
        title: '',
        content: '',
        postcode: '',
        errors: ''
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
        const ad = {
            title: this.state.title,
            content: this.state.content,
            postcode: this.state.postcode
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
            toast.info("Votre annonce a été créée avec success")
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
                toast.error("Des erreurs dans votre formulaire !!")    
            } 
        }
    }

    render() {
        return (
            <div className="container">
                <form
                    className='form'
                    onSubmit= {this.handleSubmit}>
                    <label>
                        <h3>Titre de l'annonce</h3>

                        <input
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                            type="text"
                            required
                        >
                        </input>
                        {this.state.errors.title ? <AlertMessage message = { this.state.errors.title }  /> : ""}
                        <h3>Description de l'annonce</h3>

                        <textarea
                            name='content'
                            value={this.state.content}
                            onChange={this.handleChange}
                            type="text"
                            rows="10" 
                            cols="40"
                            required
                        />
                        {this.state.errors.content ? <AlertMessage message = { this.state.errors.content }  /> : ""}
                        <h3>Localisation</h3>

                        <input
                            name='postcode'
                            value={this.state.postcode}
                            onChange={this.handleChange}
                            type="text"
                            required
                        >
                        </input>
                        {this.state.errors.postcode ? <AlertMessage message = { this.state.errors.postcode }  /> : ""}
                    </label>
                    <button className="btn" type='submit' >
                        Envoyer!
                    </button>
                </form>
            </div>
        );
    }
}

export default AddAdPage;