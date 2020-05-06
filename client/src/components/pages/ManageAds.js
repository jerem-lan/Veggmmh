import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/ListLoader';
import { toast } from 'react-toastify';
import PaginationForTab from '../PaginationForTab'
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

class ManageAds extends Component {
    state = { 
        ads : [],
        loading : true,
        search : "",
        currentPage : 1
     }

    componentDidMount() {
        axios.get('http://localhost:8000/api/ads')
             .then(res => {
                const ads = res.data['hydra:member'].reverse();
                this.setState({ ads, loading: false });
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

    handleSearch = (event) => {
        const value = event.currentTarget.value;
        this.setState({ search : value, currentPage : 1 });
    }

    handlePageChanged = (page) => {
        this.setState({ currentPage : page })
    }

    getCurrentIdUser () {
        const token = window.localStorage.getItem("authToken")
        const decoded = jwtDecode(token)
    	return decoded.id
    }

    render() { 
        //Détermine les nombres d'annonces par page
        const itemsPerPage = 5;

        const filteredAds = this.state.ads.filter(
            ad =>
                ad.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ad.content.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ad.postcode.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ad.user.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ad.id.toString().includes(this.state.search)
            )
        
        const start = this.state.currentPage * itemsPerPage - itemsPerPage
        const paginatedAds = filteredAds.slice(start, start + itemsPerPage)
       
        if (authApi.isAuthenticated()) {
            return (
               <div className="container">
                    {this.state.loading && <ListLoader /> }
                    {!this.state.loading && 
                        <>
                            <h2 className="SectionTitle">Liste des annonces</h2>
                            <div>
                                <input type="text" placeholder="Rechercher" className='input input--search' onChange={this.handleSearch} value={this.state.search}/>
                            </div>
                            <table className="tableAdmin tableAdmin--ads">
                                <thead>
                                    <tr>
                                        <th>ID.</th>
                                        <th>Titre</th>
                                        <th>Code postal</th>
                                        <th>Annonce de</th>
                                        <th>Date de création</th>
                                        <th>Date de modification</th>
                                        <th /> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedAds.length === 0 && 
                                        <tr>
                                            <td> Aucun résultat </td>
                                        </tr>
                                    }
                                    {paginatedAds.map(ad => 
                                        <tr key={ad.id}>
                                            <td>{ad.id}</td>
                                            <td><strong className="capitalize">{ad.title}</strong></td>
                                            <td>{ad.postcode}</td>
                                            <td>{ad.user.username}</td>
                                            <td>{ad.creationDate}</td>
                                            <td>{ad.modificationDate}</td>
                                            <td className="alignTabButton">
                                                <NavLink to={{
                                                    pathname: `/annonce/${ad.id}`,
                                                    props: {
                                                        id: `${ad.id}`,
                                                        idUser:`${ad.user.id}`,
                                                        title: `${ad.title}`,
                                                        postcode: `${ad.postcode}`,
                                                        creationDate: `${ad.creationDate}`,
                                                        modificationDate: `${ad.modificationDate}`,
                                                        content: `${ad.content}`,
                                                        username: `${ad.user.username}`,
                                                        userEmail : `${ad.user.email}`,
                                                        currentIdUser : `${this.getCurrentIdUser()}`
                                                    }
                                                }}>
                                                    <svg  viewBox="0 0 31 31" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill="none" d="M.5 1h30v30H.5z"/><path d="M26.8 16s-5 7-11.3 7c-6.3 0-11.3-7-11.3-7s5-7 11.3-7c6.2 0 11.3 7 11.3 7z" stroke="#56B693" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 20.6a4.6 4.6 0 100-9.2 4.6 4.6 0 000 9.2z" stroke="#56B693" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 18a2 2 0 100-4 2 2 0 000 4z" fill="#56B693"/>
                                                    </svg>
                                                </NavLink>
                                                <svg className="btn--delete" onClick={() => this.handleDelete(ad.id)} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18M6 6l12 12" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <PaginationForTab currentPage={this.state.currentPage} itemsPerPage={itemsPerPage} length={filteredAds.length} onPageChanged={this.handlePageChanged}/>
                        </>
                    }
               </div>
            )
        }
    }
}
 
export default ManageAds;