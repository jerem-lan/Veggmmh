import axios from 'axios';
import jwtDecode from 'jwt-decode';

function authenticate(state) {
    return axios
    .post("http://127.0.0.1:8000/api/login_check", state)
    .then(response => response.data.token)
    .then(token => {
        //je stocke le token dans mon locastorage
        window.localStorage.setItem("authToken", token);

        //on previent axios qu'on a maintenant un header par defaut sur toutes nos futures requetes http
        axios.defaults.headers["Authorization"] = 'Bearer ' + token;

        return true;
    });
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = 'Bearer ' + token;
}

function setup(){
    const token = window.localStorage.getItem("authToken");

    if (token) {

        const { exp: expiration} = jwtDecode(token);

        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
            return true;
        } 
    }
}

export default {
    authenticate,
    setup
};