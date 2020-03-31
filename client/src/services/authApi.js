import axios from 'axios';

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

export default {
    authenticate
};