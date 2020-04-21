import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AlertMessage from '../AlertMessage';

const EditAdPage = (props) => {

    const [Title, setTitle] = useState([]);
    const [Content, setContent] = useState([]);
    const [Postcode, setPostcode] = useState([]);
    const [Id, setId] = useState([]);
    const [Error, setError] = useState([])

    useEffect(() => { 
        try {
            window.localStorage.setItem("adTitle", props.location.props.title.title);
            window.localStorage.setItem("adContent", props.location.props.content.content);
            window.localStorage.setItem("adPostcode", props.location.props.postcode.postcode);
            setTitle(props.location.props.title.title)
            setContent(props.location.props.content.content)
            setPostcode(props.location.props.postcode.postcode)
            setId(props.location.props.id.id)
        } 
        catch(error) {
            setTitle(window.localStorage.getItem("adTitle"));
            setContent(window.localStorage.getItem("adContent"));
            setPostcode(window.localStorage.getItem("adPostcode"));
            setId(window.localStorage.getItem("adId"));
        }
    }, [])
    

    function handleTitleChange(e){
        setTitle(e.target.value) 
    }
    function handleContentChange(e){
        setContent(e.target.value) 
    }
    function handlePostcodeChange(e){
        setPostcode(e.target.value) 
    }

    const handleSubmit = async event => {
        event.preventDefault()
        //on recupère le token
        const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const ad = {
            title: Title,
            content: Content,
            postcode: Postcode
        };
        console.log(ad)
        //on donne le header et les données à axios
        try { await axios.put( 
            'http://localhost:8000/api/ads/'+Id,
            ad,
            config
          );
            toast.info("Votre annonce a été modifié avec succès 👌")
            props.history.replace("/dashboard");
        } catch (error) {
            const {violations} = error.response.data
            if(violations){
                const apiErrors = {};
                violations.map(violation => 
                    apiErrors[violation.propertyPath] = violation.message
                );     
                setError(apiErrors)
                toast.error("🤕 Oups il y a une erreur")    
            } 
        }
    }
        return (
                <div className="container">
                <form
                    className='form'
                    onSubmit = {handleSubmit}
                    >
                    <label>
                        <h3>Titre de l'annonce</h3>

                        <input
                            name='Title'
                            value={Title}
                            onChange={handleTitleChange}
                            type="text"
                            required
                        >
                        </input>
                        {Error.title ? <AlertMessage message = { Error.title }  /> : ""}
                        <h3>Description de l'annonce</h3>

                        <textarea
                            name='Content'
                            value={Content}
                            onChange={handleContentChange}
                            type="text"
                            rows="10" 
                            cols="40"
                            required
                        />
                        {Error.content ? <AlertMessage message = { Error.content }  /> : ""}
                        <h3>Localisation</h3>

                        <input
                            name='Postcode'
                            value={Postcode}
                            onChange={handlePostcodeChange}
                            type="text"
                            required
                        >
                        </input>
                        {Error.postcode ? <AlertMessage message = { Error.postcode }  /> : ""}
                    </label>
                    <button className="btn" type='submit' >
                        Envoyer!
                    </button>
                </form>
            </div>
            );

        
}

export default EditAdPage;