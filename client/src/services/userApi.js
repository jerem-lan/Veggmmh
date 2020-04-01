import axios from 'axios';

function getUserInfo(id) {

    return axios
            .get("http://127.0.0.1:8000/api/users/" + id)
            .then(data => setState(data))
            .catch(error => console.log(error.response));

}