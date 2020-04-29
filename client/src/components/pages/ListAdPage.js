import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ListLoader from '../../loaders/AddLoader';
import jwtDecode from 'jwt-decode';
import authApi from '../../services/authApi';


class ListAdPage extends Component {
    state = {
        ads: [],
        loading: true,
        search : ""
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/ads')
             .then(res => {
                const ads = res.data['hydra:member'].reverse();
                this.setState({ ads, loading: false });

                console.log(this.state.ads, "coucou")

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
        axios.delete("http://127.0.0.1:8000/api/ads/" + id, config)
        
            .then(response => console.log('ok'))
            .catch(error => {
                this.setState({ ads: original });
                 console.log(error.response);
            });
    }
    text_truncate = (str, length, ending) => {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
            console.log("oui")
          return str.substring(0, length - ending.length) + ending;
        } else {
            console.log(str)
          return str;
        }
    };
    handleSearch = (event) => {
        const value = event.currentTarget.value;
        this.setState({ search : value});
    }
    
  
    render() { 
        if (authApi.isAuthenticated()) {
        //Récupération du role et de l'id de l'utilisateur connecté 
        const decoded = jwtDecode(window.localStorage.getItem("authToken"))
        const role = decoded.roles
        const idUser = decoded.id
        
        const filteredAds = this.state.ads.filter(ad =>
                ad.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ad.postcode.includes(this.state.search))
        return (
            <Fragment>
                <h2>Annonces</h2>
                <div className="container">

                <input type="text" placeholder="Rechercher" className='input' onChange={this.handleSearch} value={this.state.search}/>

                    {this.state.loading && <ListLoader /> }
                    {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
                    { !this.state.loading && this.state.ads.map(ad =>
                    
                        <div className="adItem--container" key={ad.id}> 
                            <h3>{ad.title}</h3>
                            <p>Le {ad.creationDate} par <span>{ad.user.username}</span></p>
                            <p className="adItem--content">{this.text_truncate(ad.content, 80)}</p>
                            <p>{ad.postcode}</p>
                            {/* Est-ce que l'id de l'utilisateur connecté est différent de celui qui a ajouté l'annonce? 
                                Si oui : Affiche le bouton Répondre
                            */}
                            
                            {idUser !== ad.user.id && <button className="btn" type="submit">repondre</button>}
                            {/* Si le role de l'utilisateur est connecté est ADMIN, alors affiche le bouton supprimer */}
                            {role[0] === "ROLE_ADMIN" && <button className="btn" onClick={() => this.handleDelete(ad.id)}>supprimer</button>}
                            
                        </div>)}
                </div>
           </Fragment>
        )
        } else { 
            return (
                <Fragment>
                    <h2>Annonces</h2>
                    <div className="container">
                        {this.state.loading && <ListLoader /> }
                        {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
                        { !this.state.loading && this.state.ads.reverse().map(ad =>
                        <div className="adItem--container" key={ad.id}> 
                            <h3>{ad.title}</h3>
                            <p>Le {ad.creationDate} par <span>{ad.user.username}</span></p>
                            <p className="adItem--content">{this.text_truncate(ad.content, 80)}</p>
                            <p>{ad.postcode}</p>
                        </div>)}
                    </div>
                </Fragment>
             )
        }
    }
}

export default ListAdPage;