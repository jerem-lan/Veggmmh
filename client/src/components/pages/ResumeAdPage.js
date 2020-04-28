import React, { useState, useEffect } from 'react';

const ResumeAdPage = (props) => {

    const [Id, setId] = useState([]) // Id de l'annonce
    const [Title, setTitle] = useState([]) // Titre de l'annonce
    const [Postcode, setPostcode] = useState([]) // Code postale de l'annonce
    const [CreationDate, setCreationDate] = useState([]) // Date de création de l'annonce
    const [ModificationDate, setModificationDate] = useState([]) // Date de modification de l'annonce
    const [Content, setContent] = useState([]) // Contenu de l'annonce
    const [Username, setUsername] = useState([]) // Utilisateur qui a créé l'annonce

    useEffect(() => { 
        try {
            window.localStorage.setItem("adId", props.location.props.id);
            window.localStorage.setItem("adTitle", props.location.props.title);
            window.localStorage.setItem("adPostcode", props.location.props.postcode);
            window.localStorage.setItem("adCreationDate", props.location.props.creationDate);
            window.localStorage.setItem("adContent", props.location.props.content);
            window.localStorage.setItem("adUsername", props.location.props.username);
            setId(props.location.props.id)
            setTitle(props.location.props.title)
            setPostcode(props.location.props.postcode);
            setCreationDate(props.location.props.creationDate);
            setContent(props.location.props.content);
            setUsername(props.location.props.username);
        } 
        catch(error) {
            setId(window.localStorage.getItem("adId"));
            setTitle(window.localStorage.getItem("adTitle"));
            setPostcode(window.localStorage.getItem("adPostcode"));
            setCreationDate(window.localStorage.getItem("adCreationDate"));
            setContent(window.localStorage.getItem("adContent"));
            setUsername(window.localStorage.getItem("adUsername"));
        }
    }, [props])
    
    return (
        <div className="container">
            <div>
                <h2>{Title}</h2>
                <p>{CreationDate}</p>
                <p> Crée par : {Username} </p>
                <p>{Content}</p>
            </div>
        </div> 
    );
};

export default ResumeAdPage;
