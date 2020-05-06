import React, { Component } from 'react';
import axios from 'axios';
import ListLoader from '../../loaders/ListLoader';
import jwtDecode from 'jwt-decode';
import authApi from '../../services/authApi';
import { NavLink } from 'react-router-dom';
import PaginationForTab from '../PaginationForTab'

class ListAdPage extends Component {
    state = {
        ads: [],
        loading: true,
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

    text_truncate = (str, length, ending) => {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
    };

    handleSearch = (event) => {
        const value = event.currentTarget.value;
        this.setState({ search : value, currentPage : 1 });
    }

    handlePageChanged = (page) => {
        this.setState({ currentPage : page })
    }
  
    render() { 
        //Détermine les nombres d'annonces par page
        const itemsPerPage = 5;

        const filteredAds = this.state.ads.filter(
            ad =>
                ad.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ad.content.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ad.postcode.toLowerCase().includes(this.state.search.toLowerCase()) ||
                ad.user.username.toLowerCase().includes(this.state.search.toLowerCase())
            )
        
        const start = this.state.currentPage * itemsPerPage - itemsPerPage
        const paginatedAds = filteredAds.slice(start, start + itemsPerPage)

        if (authApi.isAuthenticated()) {
            //Récupération du role et de l'id de l'utilisateur connecté 
            const decoded = jwtDecode(window.localStorage.getItem("authToken"))
            const idUser = decoded.id
            return (    
                    <div className="container">
                        <h2 className="SectionTitle">Annonces</h2>
                        <input type="text" placeholder="Rechercher" className='input' onChange={this.handleSearch} value={this.state.search}/>
                        {this.state.loading && <ListLoader /> }
                        {paginatedAds.length === 0 && 
                                    <div>
                                        <p> Aucun résultat </p>
                                    </div>
                        }
                        {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
                        { !this.state.loading && paginatedAds.map(ad =>
                                <div className="adItem--container" key={ad.id}> 
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
                                            currentIdUser : `${idUser}`
                                        }
                                    }}>
                                        <h3 className="CardTitle">{ad.title}</h3>
                                        <p>Le {ad.creationDate} par <span>{ad.user.username}</span></p>
                                        <p className="adItem--content  capitalize">{this.text_truncate(ad.content, 80)}</p>
                                        <p>{ad.postcode}</p>
                                    </NavLink>
                                </div>
                        )}
                        <PaginationForTab currentPage={this.state.currentPage} itemsPerPage={itemsPerPage} length={filteredAds.length} onPageChanged={this.handlePageChanged}/>
                    </div>
            )

        } else { 
            return (
                <div className="container">
                    <h2 className="SectionTitle">Annonces</h2>
                    {this.state.loading && <ListLoader /> }
                    {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
                    { !this.state.loading && paginatedAds.map(ad =>
                        <div className="adItem--container" key={ad.id}> 
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
                                }
                            }}>
                                <h3>{ad.title}</h3>
                                <p>Le {ad.creationDate} par <span>{ad.user.username}</span></p>
                                <p className="adItem--content capitalize">{this.text_truncate(ad.content, 80)}</p>
                                <p>{ad.postcode}</p>
                            </NavLink>
                        </div>
                    )}
                    <PaginationForTab currentPage={this.state.currentPage} itemsPerPage={itemsPerPage} length={filteredAds.length} onPageChanged={this.handlePageChanged}/>
                </div>
            )
        }
    }
}

export default ListAdPage;