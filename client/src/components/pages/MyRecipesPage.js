import React, { useState, useEffect } from 'react'
import MyRecipes from '../MyRecipes'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ListLoader from '../../loaders/ListLoader';
import { toast } from 'react-toastify';


const MyRecipesPage = () => {
  // Un state pour chaque ressource avec la fonction qui permet de modifier le state
  const [Recipes, setRecipes] = useState([]);
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupération du token et de l'id de l'utilisateur actuellement connecté
    const token = window.localStorage.getItem("authToken")
    const decoded = jwtDecode(token)
    const id = decoded.id

    //Requête pour avoir les recettes qu'il a crée
		axios
      .get("http://localhost:8000/api/users/"+id+"/recipes/")
      .then(res => {
        const data = res.data['hydra:member'].reverse();
        setLoading(false)
        setRecipes(data)
      });
  }, [])

    //Fonction qui permet la suppression d'une recette, passée en props au composant inférieur : MyRecipes
    const handleDeleteRecipe = (id) => {
      const token = window.localStorage.getItem("authToken")
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const OriginalRecipes = [...Recipes]

      setRecipes(Recipes.filter(recipe => recipe.id !== id))

      axios
        .delete("http://localhost:8000/api/recipes/"+id, config)
        .then(response => 
            toast.info("👌 Votre recette a été supprimée avec succès")
            )
        .catch(error => {
          setRecipes(OriginalRecipes);
          console.log(error.response);
          toast.error("😞 Oups, quelque chose s'est mal passé")
        })
    }
    
    return (
      <>
        {Loading && <ListLoader />} 
        {!Loading && <div className="container">
          <MyRecipes Recipes={Recipes} handleDeleteRecipe={handleDeleteRecipe}/>
        </div>}
      </>
    );
}

export default MyRecipesPage;