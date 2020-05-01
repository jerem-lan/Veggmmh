import React from 'react';
import jwtDecode from 'jwt-decode';
import { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


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
        axios.delete("http://127.0.0.1:8000/api/ads/" + id, config)
        
            .then(response => 
                toast.info("👌 L'annonce a été supprimée avec succès"),
                this.props.history.replace("/dashboard"))
            .catch(error => {
                console.log(error.response);
                toast.error("😞 Oups, quelque chose s'est mal passé")
            });
    }
    
    render () {
        return (
            <div className="container">
                <div>
                    <h2>{this.state.title}</h2>
                    <p>{this.state.creationDate}</p>
                    {this.state.modificationDate !== "null" && <p>{this.state.modificationDate}</p> }
                    <p> Crée par : {this.state.username} </p>
                    <p>Code postal : {this.state.postcode}</p>
                    <p>{this.state.content}</p>
                    {/* Est-ce que l'id de l'utilisateur connecté est différent de celui qui a ajouté l'annonce? 
                        Si oui : Affiche le bouton Répondre
                    */}

                    {((this.state.idCurrentUser) && (this.state.idCurrentUser !== this.state.idUserAd)) && <a href={`mailto:${this.state.emailUserAd}`}><button className="btn" type="submit">Répondre</button></a>}
                    {/* Si le role de l'utilisateur est connecté est ADMIN, alors affiche le bouton supprimer */}
                    {(((this.state.role[0] === "ROLE_ADMIN") || (this.state.idCurrentUser === this.state.idUserAd)) && this.state.idCurrentUser) && <button className="btn" onClick={() => this.handleDelete(this.state.id)}>Supprimer</button>}     
                </div>
            </div> 
        );
    }
};

export default ResumeAdPage;
