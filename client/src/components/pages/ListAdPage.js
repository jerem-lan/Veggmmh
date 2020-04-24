import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import ListLoader from '../../loaders/AddLoader';
import jwtDecode from 'jwt-decode';
import authApi from '../../services/authApi';


class ListAdPage extends Component {
    state = {
        ads: [],
        loading: true
    }

    componentDidMount() {
        Axios.get('http://localhost:8000/api/ads')
             .then(res => {
                const ads = res.data['hydra:member'].reverse();
                this.setState({ ads, loading: false });
             })
    }

    handleDelete(id){
        const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        //on enleve l'annonce de la page
        let original = this.state.ads
        let ads = this.state.ads.filter(ad => {return ad.id !== id})
        this.setState({ ads: ads })
        //on supprime l'annonce dans la BDD
        Axios.delete("http://127.0.0.1:8000/api/ads/" + id, config)
        
            .then(response => console.log('ok'))
            .catch(error => {
                this.setState({ ads: original });
                 console.log(error.response);
            });
    }
  
    render() { 
        if (authApi.isAuthenticated()) {
        //Récupération du role et de l'id de l'utilisateur connecté 
        const decoded = jwtDecode(window.localStorage.getItem("authToken"))
        const role = decoded.roles
        const idUser = decoded.id
        return (
           <div className="container">
               {this.state.loading && <ListLoader /> }
               {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
               { !this.state.loading && this.state.ads.map(ad =>
                <list-item key={ad.id}> 
                    <h2>{ad.title}</h2>
                    <p>Ajouté par : {ad.user.username} - Le {ad.creationDate}</p>
                    <p>{ad.content}</p>
                    <p>{ad.postcode}</p>
                    {/* Est-ce que l'id de l'utilisateur connecté est différent de celui qui a ajouté l'annonce? 
                        Si oui : Affiche le bouton Répondre
                     */}
                    
                    {idUser !== ad.user.id && <button className="btn" type="submit">repondre</button>}
                    {/* Si le role de l'utilisateur est connecté est ADMIN, alors affiche le bouton supprimer */}
                    {role[0] === "ROLE_ADMIN" && <button className="btn" onClick={() => this.handleDelete(ad.id)}>supprimer</button>}
                    
                </list-item>)}
           </div>
        )
        } else { 
            return (
                <div className="container">
                    {this.state.loading && <ListLoader /> }
                    {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
                    { !this.state.loading && this.state.ads.reverse().map(ad =>
                     <list-item key={ad.id}> 
                         <h2>{ad.title}</h2>
                         <p>Ajouté par : {ad.user.username} - Le {ad.creationDate}</p>
                         <p>{ad.content}</p>
                         <p>{ad.postcode}</p>
                     </list-item>)}
                </div>
             )
        }
    }
}

export default ListAdPage;