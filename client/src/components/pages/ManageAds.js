import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/AddLoader';
import { toast } from 'react-toastify';
import PaginationForTab from '../PaginationForTab'

class ManageAds extends Component {
    state = { 
        ads : [],
        // adsCopy : [],
        loading : true,
        search : "",
        currentPage : 1
     }

    componentDidMount() {
        axios.get('http://localhost:8000/api/ads')
             .then(res => {
                const ads = res.data['hydra:member'].reverse();
                this.setState({ ads, loading: false });
                // this.setState({ adsCopy : ads })
             })
    }

    handleDelete(id){
        const token = window.localStorage.getItem("authToken")

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let original = [...this.state.ads]

        let ads = this.state.ads.filter(ad => {return ad.id !== id})

        this.setState({ ads: ads })

        axios.delete("http://127.0.0.1:8000/api/ads/" + id, config)
            .then(response => toast.info("👌 L'annonce a été supprimée avec succès"))
            .catch(error => {
                this.setState({ ads: original });
                console.log(error.response);
                toast.error("😞 Oups, quelque chose s'est mal passé")
            });
    }

    // handleSearch = (event) => {
    //     const value = event.currentTarget.value;
    //     this.setState({ search : value });

    //     if(value.trim()) {
    //         const adsFilter = this.state.ads.filter(
    //             ad => 
    //                 ad.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
    //                 ad.content.toLowerCase().includes(this.state.search.toLowerCase()) ||
    //                 ad.id.toString().includes(this.state.search)
    //         )
    //         this.setState({ ads : adsFilter })
    //         console.log(this.state.adsCopy)
    //     } else {
    //         this.setState({ ads : this.state.adsCopy })
    //         console.log(this.state.adsCopy)
    //     }
    // }

    handlePageChanged = (page) => {
        this.setState({ currentPage : page })
    }

    render() { 
        //Détermine les nombres d'annonces par page
        const itemsPerPage = 5;
        
        const start = this.state.currentPage * itemsPerPage - itemsPerPage
        const paginatedAds = this.state.ads.slice(start, start + itemsPerPage)
       
        if (authApi.isAuthenticated()) {
            return (
               <div className="container">
                   {this.state.loading && <ListLoader /> }
                   <h1>Liste des annonces</h1>
                   {/* <div>
                       <input type="text" placeholder="Rechercher" onChange={this.handleSearch} value={this.state.search}/>
                   </div> */}
                   <table>
                       <thead>
                           <tr>
                               <th>ID.</th>
                               <th>Crée par</th>
                               <th>Code postal</th>
                               <th>Date de création</th>
                               <th>Date de modification</th>
                               <th>Titre</th>
                               <th>Contenu</th>
                               <th /> 
                           </tr>
                       </thead>
                       <tbody>
                            { !this.state.loading && paginatedAds.map(ad => 
                                <tr key={ad.id}>
                                    <td>{ad.id}</td>
                                    <td>{ad.user.username}</td>
                                    <td>{ad.postcode}</td>
                                    <td>{ad.creationDate}</td>
                                    <td>{ad.modificationDate}</td>
                                    <td>{ad.title}</td>
                                    <td>{ad.content}</td>
                                    <td>
                                        <button className="btn" onClick={() => this.handleDelete(ad.id)}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.9933 6.49329L6.00034 18.5" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M5.99316 6.49329L17.6059 18.1061" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
				                        </button>    
                                    </td>
                                </tr>
                            )}
                       </tbody>
                   </table>
                   <PaginationForTab currentPage={this.state.currentPage} itemsPerPage={itemsPerPage} length={this.state.ads.length} onPageChanged={this.handlePageChanged}/>
               </div>
            )
        }
    }
}
 
export default ManageAds;