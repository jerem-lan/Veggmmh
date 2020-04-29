import React, { useState, useEffect } from 'react';

const ResumeUserPage = (props) => {

    const [Email, setEmail] = useState([]) // Mail de l'utilisateur
    const [Username, setUsername] = useState([]) // Username de l'utilisateur
    const [Firstname, setFirstname] = useState([]) // Prénom de l'utilisateur
    const [Lastname, setLastname] = useState([]) // Nom de famille de l'utilisateur
    const [Postcode, setPostcode] = useState([]) // Code postal de l'utilisateur
    const [RegistrationDate, setRegistrationDate] = useState([]) // Date d'inscription de l'utilisateur

    useEffect(() => { 
        try {
            window.localStorage.setItem("userEmail", props.location.props.email);
            window.localStorage.setItem("userUsername", props.location.props.username);
            window.localStorage.setItem("userFirstname", props.location.props.firstname);
            window.localStorage.setItem("userLastname", props.location.props.lastname);
            window.localStorage.setItem("userPostcode", props.location.props.postcode);
            window.localStorage.setItem("userRegistrationDate", props.location.props.registrationDate);
            setEmail(props.location.props.email)
            setUsername(props.location.props.username);
            setFirstname(props.location.props.firstname);
            setLastname(props.location.props.lastname);
            setPostcode(props.location.props.postcode);
            setRegistrationDate(props.location.props.registrationDate);
        } 
        catch(error) {
            setEmail(window.localStorage.getItem("userEmail"));
            setUsername(window.localStorage.getItem("userUsername"));
            setFirstname(window.localStorage.getItem("userFirstname"));
            setLastname(window.localStorage.getItem("userLastname"));
            setPostcode(window.localStorage.getItem("userPostcode"));
            setRegistrationDate(window.localStorage.getItem("userRegistrationDate"));
        }
    }, [props])
    
    return (
        <div className="container">
            <div>
                <h2>{Username}</h2>
                <p>Inscrit le {RegistrationDate}</p>
                <p> Nom : {Lastname} </p>
                <p> Prénom : {Firstname} </p>
                <p> Email : {Email} </p>
                <p> Code Postal : {Postcode} </p>
            </div>
        </div> 
    );
};

export default ResumeUserPage;
