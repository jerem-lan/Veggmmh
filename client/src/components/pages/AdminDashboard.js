import React, { Component } from 'react'
import featureBlocksDataAdmin from '../../data/featureBlocksDataAdmin'
import FeatureBlock from '../FeatureBlock'
import authApi from '../../services/authApi';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import DashBoardLoader from '../../loaders/DashBoardLoader';


class AdminDashboard extends Component {
    state = {  
        firstname : "",
        lastname : "", 
        loading : true
    }

    componentDidMount() {
        if (authApi.isAuthenticated()) {   
            const token = window.localStorage.getItem("authToken")
            const decoded = jwtDecode(token)
            const id = decoded.id     
            axios
                .get("http://127.0.0.1:8000/api/users/"+id)
                .then(res => {
                    const user = res.data;
                    this.setState({ 
                        firstname : user.firstname,
                        lastname : user.lastname,
                        username : user.username,
                        postcode : user.postcode,
                        email : user.email,
                        loading: false
                    });

                })
        } else {
            this.setState( {loading: false} )
            
        }
    }

    render() { 
        let loading = this.state.loading 
        return (  
            <div className="container container--dashboard"> 

                {loading && <DashBoardLoader />}      
                {!loading && authApi.isAuthenticated()  && <>
                    <div className="profilNav">
                        <div className="featureBlocks">
                            {
                                Object.keys(featureBlocksDataAdmin)
                                    .map(key => <FeatureBlock
                                                key={key}
                                                id={key} 
                                                featureBlocksData={featureBlocksDataAdmin}/>)
                            }
                        </div>
                    </div> </>}
            </div>
        );
    }
}
 
export default AdminDashboard;