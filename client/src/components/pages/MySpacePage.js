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
  // const [users, setUsers] = useState([]);

	useEffect(() => {
    // Récupération du token et de l'id de l'utilisateur actuellement connecté
		const token = window.localStorage.getItem("authToken")
  	const decoded = jwtDecode(token)
    const id = decoded.id

    // //Requête pour avoir ses informations personnelles
    // axios
    //   .get("http://127.0.0.1:8000/api/users/"+id)
    //   .then(res => {
    //     const user = res.data;
    //     setUsers({ 
    //         firstname : user.firstname,
    //         lastname : user.lastname,
    //         username : user.username,
    //         postcode : user.postcode,
    //         email : user.email
    //     });
    //   })

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

  // //Récupere les informations tapées dans le formulaire
  // handleChange = (event) => {
  //     const { name, value } = event.target
  //     setUsers({ [name]: value })
  // }
  // changePersonnalInfo = (event) => {
  //     event.preventDefault()
  //     const token = window.localStorage.getItem("authToken")
  //     const decoded = jwtDecode(token)
  //     const id = decoded.id

  //     axios({
  //         method: 'put',
  //         url: "http://127.0.0.1:8000/api/users/"+id,
  //         data: {
  //           postcode : this.state.postcode,
  //           email: this.state.email            
  //         }
  //     }).then(() => this.setState({ redirect: true }))
  //     .then(() => this.setState({ redirect: false }));
  // }
  // changePassword = (event) => {
  //     event.preventDefault()

  //     if(this.state.password !== "" && this.state.confirmPassword !== "") {
  //         if(this.state.password === this.state.confirmPassword) {
  //             const token = window.localStorage.getItem("authToken")
  //             const decoded = jwtDecode(token)
  //             const id = decoded.id

  //             axios({
  //                 method: 'put',
  //                 url: "http://127.0.0.1:8000/api/users/"+id,
  //                 data: {
  //                 password : this.state.password
  //                 }
  //             })
  //             this.setState({password : "", confirmPassword : ""})
  //         } else {
  //             return this.setState({ error: "Les mots de passe ne sont pas identiques OU ne sont pas renseignés. Veuillez recommencer" });
  //         }
  //     } 
  // }
  
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
          {/* <div className="edit--prsonnalInfos">
            <div className="title">
                <svg className="icon--title" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 5L7 9 2.5 5" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className='title--category'>Modifier mes informations</p>
            </div>
            <form className='form'>
                <input name='postcode' value={postcode} onChange={handleChange} className="subscriptionInput" type="text" placeholder={postcode}  pattern="[0-9]{5}" required/>
                <input name='email' value={email} onChange={handleChange} className="subscriptionInput" type="email" placeholder={email} required/>
                <button className="btn" type="submit" onClick={changePersonnalInfo}>Valider les changements</button>
            </form>
            <form className='form'>
                <input name='password' value={password} onChange={handleChange} className="subscriptionInput" type="password" placeholder="Nouveau mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                <input name='confirmPassword' value={confirmPassword} onChange={handleChange} className="subscriptionInput" type="password" placeholder="Confirmer le mot de passe" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                {error && <p className="invalid-feedback">{error}</p>}
                <button className="btn" type="submit" onClick={changePassword}>Modifier mes identifiants</button>
            </form>
          </div> */}

          <div className="container">
            <MyFavRecipes favRecipes={favRecipes}/>
            <MyRecipes Recipes={Recipes} handleDeleteRecipe={handleDeleteRecipe}/>
            <MyAds Ads={Ads} handleDeleteAds={handleDeleteAds} />
          </div>
        </Fragment>
    );
  }


export default MySpacePage;