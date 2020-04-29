import React, { useState, useEffect } from 'react'
import DisplayMyRecipe from './DisplayMyRecipe'
import jwtDecode from 'jwt-decode';
import PaginationForTab from './PaginationForTab'


const MyRecipes = ({ Recipes, handleDeleteRecipe }) => {
	
	const [CurrentPage, setCurrentPage] = useState(1);

	const handlePageChanged = (page) => {
		setCurrentPage(page)
	}

	function getUsername()  {
		const token = window.localStorage.getItem("authToken")
		const decoded = jwtDecode(token)
    	return decoded.username
	}
	
	//Détermine les nombres d'annonces par page
	const itemsPerPage = 5;
	const start = CurrentPage * itemsPerPage - itemsPerPage
	const paginatedRecipes = Recipes.slice(start, start + itemsPerPage)

	return (
		<div className="SectionMyRecipe">
			<h2 className="SectionTitle">
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes recettes
			</h2>
			<div className="SectionContent">
			{ paginatedRecipes.map(recipe =>
				<DisplayMyRecipe
					id={recipe.id}
					key={recipe.id}
					title={recipe.recipeTitle}
					username={getUsername()}
					handleDeleteRecipe={handleDeleteRecipe} />
			)}
			</div>
			<div>
              <PaginationForTab currentPage={CurrentPage} itemsPerPage={itemsPerPage} length={Recipes.length} onPageChanged={handlePageChanged}/>
            </div>
		</div>
	)
}

export default MyRecipes
