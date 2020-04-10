import React, { useState, useEffect, Fragment } from 'react'
import MyFavRecipes from '../MyFavRecipes'
import MyRecipes from '../MyRecipes'
import MyAds from '../MyAds'
import axios from 'axios';
import jwtDecode from 'jwt-decode';


const MySpacePage = () => {
  // Un state pour chaque ressource avec la fonction qui permet de modifier le state
  const [Recipes, setRecipes] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [Ads, setAds] = useState([]);

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
        setFavRecipes(data)
        });
    //Requête pour avoir les recettes qu'il a crées
		axios
		  .get("http://localhost:8000/api/users/"+id+"/recipes/")
		  .then(res => {
				const data = res.data['hydra:member'];
				setRecipes(data)
        });
    //Requête pour avoir les annonces qu'il a crée
    axios
      .get("http://localhost:8000/api/users/"+id+"/ads/")
      .then(res => {
        const data = res.data['hydra:member'];
        setAds(data)
      });
  }, [])
  
  //Fonction qui permet la suppression d'une recette, passé en props au composant inférieur : MyRecipes
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
  
  //Fonction qui permet la suppression d'une annonce, passé en props au composant inférieur : MyAds
  const handleDeleteAds = (id) => {
		const token = window.localStorage.getItem("authToken")
        //on le met dans un header
        const config = {
            headers: { Authorization: `Bearer ${token}` }
		};
		
		const OriginalAds = [...Ads]

		setAds(Ads.filter(ad => ad.id !== id))

		axios
		.delete("http://localhost:8000/api/ads/"+id, config)
		.then(response => console.log("ok pour Ads"))
		.catch(error => {
			setAds(OriginalAds);
			console.log(error.response);
		})
	}

    return (
        <Fragment>
            <div className="container">
              <MyFavRecipes favRecipes={favRecipes}/>
              <MyRecipes Recipes={Recipes} handleDeleteRecipe={handleDeleteRecipe}/>
              <MyAds Ads={Ads} handleDeleteAds={handleDeleteAds} />
            </div>
        </Fragment>
    );
  }


export default MySpacePage;