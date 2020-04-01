import Axios from 'axios';
import jwtDecode from 'jwt-decode';

function getUserInfo(id) {

    const token = window.localStorage.getItem("authToken")
    const  decoded = jwtDecode(token)
    const id = decoded.id
    
    Axios
        .get("http://127.0.0.1:8000/api/users/"+id)
        .then(res => {
            const user = res.data;
            this.setState({ user });
        }) 

}

export default {
    getUserInfo
}