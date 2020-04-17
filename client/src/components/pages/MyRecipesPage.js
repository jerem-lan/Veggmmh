import React, { useState, useEffect, Fragment } from 'react'

import MyRecipes from '../MyRecipes'

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ListLoader from '../../loaders/ListLoader';


const MyRecipesPage = () => {
  // Un state pour chaque ressource avec la fonction qui permet de modifier le state
  const [Recipes, setRecipes] = useState([]);
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupération du token et de l'id de l'utilisateur actuellement connecté
    const token = window.localStorage.getItem("authToken")
    const decoded = jwtDecode(token)
    const id = decoded.id

    //Requête pour avoir les recettes qu'il a crées
		axios
      .get("http://localhost:8000/api/users/"+id+"/recipes/")
      .then(res => {
        const data = res.data['hydra:member'];
        setLoading(false)
        setRecipes(data)
      });
  }, [])

    //Fonction qui permet la suppression d'une recette, passée en props au composant inférieur : MyRecipes
    const handleDeleteRecipe = (id) => {
      const token = window.localStorage.getItem("authToken")
      //on le met dans un header
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    
      const OriginalRecipes = [...Recipes]

      setRecipes(Recipes.filter(recipe => recipe.id !== id))

      axios
      .delete("http://localhost:8000/api/recipes/"+id, config)
      .then(response => console.log("ok pour MyRecipe"))
      .catch(error => {
        setRecipes(OriginalRecipes);
        console.log(error.response);
      })
    }

    return (
        
        <Fragment>
          {Loading && <ListLoader />} 
          {!Loading && <div className="container">
            <MyRecipes Recipes={Recipes} handleDeleteRecipe={handleDeleteRecipe}/>
          </div>}
        </Fragment>
    );
}

export default MyRecipesPage;