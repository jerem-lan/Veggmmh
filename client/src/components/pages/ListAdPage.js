import React, { Component } from 'react';
import Axios from 'axios';
import ListLoader from '../../loaders/AddLoader';


class ListAdPage extends Component {
    state = {
        ads: [],
        loading: true
    }

    componentDidMount() {
        Axios.get('http://localhost:8000/api/ads')
             .then(res => {
                const ads = res.data['hydra:member'];
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
        return (
           <div className="container">
               {this.state.loading && <ListLoader /> }
               { !this.state.loading && this.state.ads.map(ad =>
                <list-item key={ad.id}> 
                    <h2>{ad.title}</h2>
                    <p>{ad.content}</p>
                    <p>{ad.postcode}</p>
                    <button className="btn" type="submit">repondre</button>
                    <button className="btn" onClick={() => this.handleDelete(ad.id)}>supprimer</button>
                </list-item>)}
                
           </div>
           
        )
    }
}

export default ListAdPage;