import React, { useState, useEffect } from 'react';

const ResumeAdPage = (props) => {

    const [Title, setTitle] = useState([]) // Titre de l'annonce
    const [Postcode, setPostcode] = useState([]) // Code postale de l'annonce
    const [CreationDate, setCreationDate] = useState([]) // Date de création de l'annonce
    const [ModificationDate, setModificationDate] = useState([]) // Date de modification de l'annonce
    const [Content, setContent] = useState([]) // Contenu de l'annonce
    const [Username, setUsername] = useState([]) // Utilisateur qui a créé l'annonce

    useEffect(() => { 
        try {
            window.localStorage.setItem("adTitle", props.location.props.title);
            window.localStorage.setItem("adPostcode", props.location.props.postcode);
            window.localStorage.setItem("adCreationDate", props.location.props.creationDate);
            window.localStorage.setItem("adContent", props.location.props.content);
            window.localStorage.setItem("adUsername", props.location.props.username);
            window.localStorage.setItem("adModificationDate", props.location.props.modificationDate);
            setTitle(props.location.props.title)
            setPostcode(props.location.props.postcode);
            setCreationDate(props.location.props.creationDate);
            setModificationDate(props.location.props.modificationDate);
            setContent(props.location.props.content);
            setUsername(props.location.props.username);
        } 
        catch(error) {
            setTitle(window.localStorage.getItem("adTitle"));
            setPostcode(window.localStorage.getItem("adPostcode"));
            setCreationDate(window.localStorage.getItem("adCreationDate"));
            setContent(window.localStorage.getItem("adContent"));
            setUsername(window.localStorage.getItem("adUsername"));
            setModificationDate(window.localStorage.getItem("adModificationDate"));
        }
    }, [props])
    
    return (
        <div className="container">
            <div>
                <h2>{Title}</h2>
                <p>{CreationDate}</p>
                {ModificationDate !== "null" && <p>{ModificationDate}</p> }
                <p> Crée par : {Username} </p>
                <p>Code postal : {Postcode}</p>
                <p>{Content}</p>
            </div>
        </div> 
    );
};

export default ResumeAdPage;
