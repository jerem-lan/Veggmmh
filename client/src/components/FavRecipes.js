import React, { useState, useEffect } from 'react'
import Recipe from './Recipe'
import axios from 'axios';
import jwtDecode from 'jwt-decode';



const FavRecipes = ({ recipes }) => {

	const [favRecipes, setFavRecipes] = useState([]);

	useEffect(() => {
		const token = window.localStorage.getItem("authToken")
  	    const decoded = jwtDecode(token)
		const id = decoded.id
		  
		axios
		.get("http://localhost:8000/api/users/"+id+"/bookmarks/")
		.then(res => {
				const data = res.data['hydra:member'];
				setFavRecipes(data)
			  })
	}, [])

	
	function showSection() {
		document.querySelector(".Section").classList.toggle("hideSection")
	}


	return (
		<div className="Section">
			<h2 
				className="SectionTitle" 
				onClick={showSection} > 
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes recettes favorites
			</h2>
			<div className="SectionContent">
			 { favRecipes.map(recipe =>
                <list-item key={recipe.id}> 
                    <h2>{recipe.recipeTitle}</h2>
                    <p>{recipe.creationDate}</p>
                    <p>{recipe.ingredients}</p>
					<p>{recipe.type}</p>
                    <p>{recipe.nbServings}</p>
                    <p>{recipe.preparationTime}</p>
                    <p>{recipe.steps}</p>
					
                    {/* <button className="btn" onClick={() => this.handleDelete(recipe.id)}>supprimer</button> */}
                </list-item>) }
			</div>
		</div>
	)
}

export default FavRecipes
