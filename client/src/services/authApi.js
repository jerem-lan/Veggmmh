import axios from 'axios';
import jwtDecode from 'jwt-decode';

function logout() {
    //recupere le token et l'efface
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("adCurrentIdUser")
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
        } else {
            logout();
        }
    } else {
        logout();
    }
}

function isAuthenticated() {
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
        return false 
    } 
    return false 
}

function isAdmin() {

    const token = isAuthenticated();
    //si il y a un token
    if (token){
        //je decode le token pour recuperer le role de l'utilisateur
        const decoded = jwtDecode(window.localStorage.getItem("authToken"))
        const role = decoded.roles
        //si c'est un admin je return true sinon false
        if (role[0] === "ROLE_ADMIN") {
            return true;
            
        }else{
            return false;
        }
    }else{
        return false;
    }
    
}

//TODO : A déplacer dans un autre fichier. Permet du supprimer les espaces dans les inputs
function res(str)
{
    str = str.replace(/[\s]{2,}/g," "); // Enlève les espaces doubles, triples, etc.
    str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
    str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
    return str;    
}


export default {
    authenticate,
    setup,
    logout,
    isAuthenticated,
    isAdmin,
    res
};