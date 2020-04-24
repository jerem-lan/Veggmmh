import React, { Component } from 'react'
import axios from 'axios';
import authApi from '../../services/authApi';
import ListLoader from '../../loaders/AddLoader';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

class ManageUsers extends Component {
    state = { 
        users : [],
        loading : true
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

    render() { 
        if (authApi.isAuthenticated()) {
            return (
               <div className="container">
                   {this.state.loading && <ListLoader /> }
                   <h2>Liste des utilisateurs</h2>
                   <table>
                       <thead>
                           <tr>
                               <th>ID.</th>
                               <th>Email</th>
                               <th>Rôle</th>
                               <th>Username</th>
                               <th>Nom</th>
                               <th>Prénom</th>
                               <th>Code postal</th>
                               <th>Date d'inscription</th>
                               <th /> 
                           </tr>
                       </thead>
                       <tbody>
                            
                            {/*.reverse sur le state pour afficher les annonces les plus récentes en premier */}
                            { !this.state.loading && this.state.users.map(user => 
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                            <td>{user.roles.map(role => <div key={role}>{role}</div>)}</td>
                                    <td>{user.username}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.postcode}</td>
                                    <td>{user.registrationDate}</td>
                                    <td>
                                        <button className="btn" onClick={() => this.handleDelete(user.id)}>
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
               </div>
            )
        }
    }
}
 
export default ManageUsers;