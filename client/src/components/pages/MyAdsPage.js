import React, { useState, useEffect, Fragment } from 'react'

import MyAds from '../MyAds'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ListLoader from '../../loaders/ListLoader';
import { toast } from 'react-toastify';


const MyAdsPage = () => {
  // Un state pour chaque ressource avec la fonction qui permet de modifier le state
  const [Ads, setAds] = useState([]);
  const [Loading, setLoading] = useState(true)

	useEffect(() => {
    // Récupération du token et de l'id de l'utilisateur actuellement connecté
	  const token = window.localStorage.getItem("authToken")
  	const decoded = jwtDecode(token)
    const id = decoded.id

    //Requête pour avoir les annonces qu'il a crée
    axios
      .get("http://localhost:8000/api/users/"+id+"/ads/")
      .then(res => {
        const data = res.data['hydra:member'].reverse();
        setLoading(false)
        setAds(data)
      });
  }, [])
  
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
    .then(response => 
          toast.info("👌 Votre annonce a été supprimée avec succès")
          )
		.catch(error => {
			setAds(OriginalAds);
      console.log(error.response);
      toast.error("😞 Oups, quelque chose s'est mal passé")
		})
  }

    return (
        <Fragment>
          {Loading && <ListLoader />} 
          {!Loading && 
            <div className="container">
              <MyAds Ads={Ads} handleDeleteAds={handleDeleteAds} />
            </div>
          }
        </Fragment>
    );
}


export default MyAdsPage;