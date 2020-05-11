import React, { useState, useEffect, Fragment } from 'react'

import MyFavRecipes from '../MyFavRecipes'

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ListLoader from '../../loaders/ListLoader';
import { toast } from 'react-toastify';
import { USERS_URL, BOOKMARKS_URL } from '../../services/config';


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
        .get(USERS_URL + '/' + id + "/bookmarks/")
        .then(res => {
          const data = res.data['hydra:member'].reverse();
          setLoading(false)
          setFavRecipes(data)
          });
    }, [])

    const handleDeleteFavRecipe = (id) => {
      const token = window.localStorage.getItem("authToken")
      //on le met dans un header
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const decoded = jwtDecode(token)
      const user = decoded.id
      const OriginalRecipes = [...favRecipes]
      const recipe = {
        id: id
      }
      setFavRecipes(favRecipes.filter(recipe => recipe.id !== id))

      axios
      .put(BOOKMARKS_URL + '/' + user + "/delete", recipe, config)
      .then(response => 
          toast.info("👌 Votre recette favorite a été supprimée avec succès")
          )
      .catch(error => {
        setFavRecipes(OriginalRecipes);
        console.log(error.response);
        toast.error("😞 Oups, quelque chose s'est mal passé")
      })
    }

    return (
      <Fragment>
        {Loading && <ListLoader />}
        {!Loading && 
          <div className="container">
            <MyFavRecipes favRecipes={favRecipes} handleDeleteFavRecipe={handleDeleteFavRecipe} />
          </div>}
      </Fragment>
      );
}
    
export default MyFavRecipesPages;