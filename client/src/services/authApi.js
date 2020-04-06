import axios from 'axios';
import jwtDecode from 'jwt-decode';

function logout() {
    //recupere le token et l'efface
    window.localStorage.removeItem("authToken");
    //efface l'autorization qui est necessaire
    delete axios.defaults.headers["Authorization"];
}

function authenticate(state) {
    return axios
    .post("http://127.0.0.1:8000/api/login_check", state)
    .then(response => response.data.token)
    .then(token => {
        //stocke le token dans mon locastorage
        window.localStorage.setItem("authToken", token);
        //previent axios qu'on a maintenant un header par defaut sur toutes nos futures requetes http
        axios.defaults.headers["Authorization"] = 'Bearer ' + token;
        return true;
    });
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = 'Bearer ' + token;
}

function setup(){
    //voit si on a un token
    const token = window.localStorage.getItem("authToken");
    //si le token est encore valide
    if (token) {
        const { exp: expiration} = jwtDecode(token);
        //donne le token à axios
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
            return true;
        } 
    }
}

export default {
    authenticate,
    setup,
    logout
};