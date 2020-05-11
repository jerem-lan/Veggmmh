import React from 'react';
import jwtDecode from 'jwt-decode';
import { Component, Fragment } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ADS_URL } from '../../services/config';


class ResumeAdPage extends Component {
    state =  {
        id : "",
        idUserAd : "",
        emailUserAd : "",
        username : "",
        idCurrentUser : "",
        title : "",
        postcode : "",
        creationDate : "",
        modificationDate : "",
        content : "",
        role : "",
    }

    componentDidMount() {
        try { 
            if(window.localStorage.getItem("authToken")) {
                const decoded = jwtDecode(window.localStorage.getItem("authToken"))
                this.setState({role : decoded.roles}) 
            }
            
            window.localStorage.setItem("adCurrentIdUser", this.props.location.props.currentIdUser);
            window.localStorage.setItem("adIdUser", this.props.location.props.idUser);
            window.localStorage.setItem("adUserEmail", this.props.location.props.userEmail);
            window.localStorage.setItem("adId", this.props.location.props.id);
            window.localStorage.setItem("adTitle", this.props.location.props.title);
            window.localStorage.setItem("adPostcode", this.props.location.props.postcode);
            window.localStorage.setItem("adCreationDate", this.props.location.props.creationDate);
            window.localStorage.setItem("adContent", this.props.location.props.content);
            window.localStorage.setItem("adUsername", this.props.location.props.username);
            window.localStorage.setItem("adModificationDate", this.props.location.props.modificationDate);
            this.setState({idCurrentUser : this.props.location.props.currentIdUser})
            this.setState({emailUserAd : this.props.location.props.userEmail})
            this.setState({idUserAd : this.props.location.props.idUser})
            this.setState({id : this.props.location.props.id})
            this.setState({title : this.props.location.props.title})
            this.setState({postcode : this.props.location.props.postcode});
            this.setState({creationDate : this.props.location.props.creationDate});
            this.setState({modificationDate : this.props.location.props.modificationDate});
            this.setState({content : this.props.location.props.content});
            this.setState({username : this.props.location.props.username});
        } 
        catch(error) {
            if(window.localStorage.getItem("authToken")) {
                const decoded = jwtDecode(window.localStorage.getItem("authToken"))
                this.setState({role : decoded.roles}) 
            }

            this.setState({idCurrentUser : window.localStorage.getItem("adCurrentIdUser")})
            this.setState({emailUserAd : window.localStorage.getItem("adUserEmail")})
            this.setState({idUserAd : window.localStorage.getItem("adIdUser")})
            this.setState({id: window.localStorage.getItem("adId")})
            this.setState({title : window.localStorage.getItem("adTitle")});
            this.setState({postcode : window.localStorage.getItem("adPostcode")});
            this.setState({creationDate : window.localStorage.getItem("adCreationDate")});
            this.setState({content : window.localStorage.getItem("adContent")});
            this.setState({username : window.localStorage.getItem("adUsername")});
            this.setState({modificationDate : window.localStorage.getItem("adModificationDate")});
        }
    }

    handleDelete(id){
        const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.delete(ADS_URL + '/' + id, config)
        
            .then(response => 
                toast.info("👌 L'annonce a été supprimée avec succès"),
                this.props.history.replace("/dashboard"))
            .catch(error => {
                console.log(error.response);
                toast.error("😞 Oups, quelque chose s'est mal passé")
            });
    }
    
    render () {
        const BackWithRouter = this.props.BackWithRouter
        return (
            <Fragment>
                <BackWithRouter />
                <div className="container">
                    <div>
                        <div className="adInfos">
                            <h2 className="capitalize">{this.state.title}</h2>
                            <p className="adDate">Ajoutée le {this.state.creationDate}</p>
                            {this.state.modificationDate !== "null" && <p>Mise à jour le {this.state.modificationDate}</p> }
                            <p className="adAuthor">Postée par <span>{this.state.username}</span></p>
                        </div>
                        <div className="adContainer">
                            <h3>Description</h3>
                            <p className="capitalize">{this.state.content}</p>
                            <h3>
                                <svg className="icon--localisation" viewBox="0 0 24 24" width="15px" height="15px">
                                    <path d="M12 0a8.81 8.81 0 00-9 8.63c0 5.14 5.68 12.23 8 14.93a1.32 1.32 0 002 0c2.33-2.7 8-9.79 8-14.93A8.81 8.81 0 0012 0zm0 11.71a3.15 3.15 0 01-3.21-3.08A3.15 3.15 0 0112 5.55a3.15 3.15 0 013.21 3.08A3.15 3.15 0 0112 11.71z">
                                    </path>
                                </svg>
                                {this.state.postcode}
                            </h3>
                        </div>

                        {/* Est-ce que l'id de l'utilisateur connecté est différent de celui qui a ajouté l'annonce? 
                            Si oui : Affiche le bouton Répondre
                        */}
                        {((this.state.idCurrentUser) && (this.state.idCurrentUser !== this.state.idUserAd)) && <a href={`mailto:${this.state.emailUserAd}`}><button className="btn btn--contact" type="submit">Contacter par mail</button></a>}
                        {/* Si le role de l'utilisateur est connecté est ADMIN, alors affiche le bouton supprimer */}
                        {(((this.state.role[0] === "ROLE_ADMIN") || (this.state.idCurrentUser === this.state.idUserAd)) && this.state.idCurrentUser) && <button className="btn" onClick={() => this.handleDelete(this.state.id)}>Supprimer l'annonce</button>}

                    </div>
                </div>
            </Fragment>
        );
    }
};

export default ResumeAdPage;
