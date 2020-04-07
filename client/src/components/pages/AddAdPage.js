import React, { Component, Fragment } from 'react';
import axios from 'axios';



class AddAdPage extends Component {
    state = {
        title: '',
        content: '',
        postcode: ''
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
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
        axios.post( 
            'http://localhost:8000/api/ads',
            ad,
            config
          );

            this.setState({
                title: '',
                content: '',
                postcode: ''
            })
            
    }

    render() {
        return (
            <Fragment>
                <div className="Content">
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
                                required >
                            </input>

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

                            <h3>Localisation</h3>

                            <input
                                name='postcode'
                                value={this.state.postcode}
                                onChange={this.handleChange}
                                type="text"
                                required >
                            </input>
                        </label>
                        <button className="btn" type='submit' >
                            Envoyer!
                        </button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default AddAdPage;