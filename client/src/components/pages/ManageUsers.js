import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/AddLoader';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import PaginationForTab from '../PaginationForTab'
import { NavLink } from 'react-router-dom';

class ManageUsers extends Component {
    state = { 
        users : [],
        loading : true,
        currentPage : 1,
        search : ""
    }

    componentDidMount() {
        const token = window.localStorage.getItem("authToken")

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('http://localhost:8000/api/admin/users', config)
             .then(res => {
                const users = res.data['hydra:member'].reverse();
                this.setState({ users, loading: false });
             })
    }

    handleDelete(id){
        const token = window.localStorage.getItem("authToken")
        const decoded = jwtDecode(token)
        const userId = decoded.id
        if(userId !== id) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            let original = [...this.state.users]

            let users = this.state.users.filter(users => {return users.id !== id})

            this.setState({ users: users })

            axios.delete("http://127.0.0.1:8000/api/admin/users/" + id, config)
                .then(response => toast.info("👌 L'utilisateur a été supprimé avec succès"))
                .catch(error => {
                    this.setState({ users: original });
                    console.log(error.response);
                    toast.error("😞 Oups, quelque chose s'est mal passé")
                });
        } else {
            toast.error("🥴 Demande plutôt à ton collègue. 🥴")
        }
    }

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

        const filteredUsers = this.state.users.filter(
            user =>
                user.email.toLowerCase().includes(this.state.search.toLowerCase()) ||
                user.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
                user.firstname.toLowerCase().includes(this.state.search.toLowerCase()) ||
                user.lastname.toLowerCase().includes(this.state.search.toLowerCase()) ||
                user.postcode.toLowerCase().includes(this.state.search.toLowerCase()) ||
                user.id.toString().includes(this.state.search)
            )
        
        const start = this.state.currentPage * itemsPerPage - itemsPerPage
        const paginatedUsers = filteredUsers.slice(start, start + itemsPerPage)

        if (authApi.isAuthenticated()) {
            return (
               <div className="container">
                   {this.state.loading && <ListLoader /> }
                   <h2>Liste des utilisateurs</h2>
                   <div>
                       <input type="text" placeholder="Rechercher" className='input' onChange={this.handleSearch} value={this.state.search}/>
                   </div>
                   <table className="tableAdmin">
                       <thead>
                           <tr>
                               <th>ID.</th>
                               <th>Email</th>
                               <th>Rôle</th>
                               <th>Nom d'utilisateur</th>
                               <th>Nom</th>
                               <th>Prénom</th>
                               <th>Code postal</th>
                               <th>Date d'inscription</th>
                               <th /> 
                               <th />
                           </tr>
                       </thead>
                       <tbody>
                            {paginatedUsers.length === 0 && 
                            <tr>
                                <td> Aucun résultat </td>
                            </tr>
                            }
                            { !this.state.loading && paginatedUsers.map(user => 
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roles.map(role => <div key={role}>{role}</div>)}</td>
                                    <td>{user.username}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.postcode}</td>
                                    <td>{user.registrationDate}</td>
                                    <td className="alignTabButton">
                                        <button className="btn" onClick={() => this.handleDelete(user.id)}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.9933 6.49329L6.00034 18.5" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M5.99316 6.49329L17.6059 18.1061" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
				                        </button>    
                                    </td>
                                    <td className="alignTabButton">
                                        <NavLink to={{
                                            pathname: `/utilisateur/${user.id}`,
                                            props: {
                                                id : `${user.id}`,
                                                email: `${user.email}`,
                                                username: `${user.username}`,
                                                firstname: `${user.firstname}`,
                                                lastname: `${user.lastname}`,
                                                postcode: `${user.postcode}`,
                                                registrationDate: `${user.registrationDate}`,
                                            }
                                        }}>
                                            <button className="btn">
                                                <svg viewBox="0 0 31 31" width="31" height="31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="none" d="M.5 1h30v30H.5z"/><path d="M26.8 16s-5 7-11.3 7c-6.3 0-11.3-7-11.3-7s5-7 11.3-7c6.2 0 11.3 7 11.3 7z" stroke="#fff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M15.5 20.6a4.6 4.6 0 100-9.2 4.6 4.6 0 000 9.2z" stroke="#fff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M15.5 18a2 2 0 100-4 2 2 0 000 4z" fill="#fff"/>
                                                </svg>
                                            </button>
                                        </NavLink>
                                    </td>
                                </tr>
                            )}
                       </tbody>
                   </table>
                   <PaginationForTab currentPage={this.state.currentPage} itemsPerPage={itemsPerPage} length={filteredUsers.length} onPageChanged={this.handlePageChanged}/>
               </div>
            )
        }
    }
}
 
export default ManageUsers;