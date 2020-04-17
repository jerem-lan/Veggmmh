import React, { useState, useEffect, Fragment } from 'react'

import MyFavRecipes from '../MyFavRecipes'

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ListLoader from '../../loaders/ListLoader';


const MyFavRecipesPages = () => {
    // Un state pour chaque ressource avec la fonction qui permet de modifier le state
    const [favRecipes, setFavRecipes] = useState([]);
    const [Loading, setLoading] = useState(true)
    useEffect(() => {
    // Récupération du token et de l'id de l'utilisateur actuellement connecté
    	const token = window.localStorage.getItem("authToken")
      const decoded = jwtDecode(token)
      const id = decoded.id
    
      //Requête pour avoir ses recettes favorites  
      axios
        .get("http://localhost:8000/api/users/"+id+"/bookmarks/")
        .then(res => {
          const data = res.data['hydra:member'];
          setLoading(false)
          setFavRecipes(data)
          });
    }, [])

    return (
      <Fragment>
        {Loading && <ListLoader />}
        {!Loading && <div className="container">
          <MyFavRecipes favRecipes={favRecipes}/>
        </div>}
      </Fragment>
      );
}
    
export default MyFavRecipesPages;