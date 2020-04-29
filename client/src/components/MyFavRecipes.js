import React from 'react'
import DisplayMyFavRecipe from './DisplayMyFavRecipe'


const MyFavRecipes = ({ favRecipes, handleDeleteFavRecipe }) => {

	
	function showSectionFavRecipe() {
		document.querySelector(".SectionFavRecipe").classList.toggle("hideSection")
	}

	return (
		<div className="SectionFavRecipe">
			<h2 
				className="SectionTitle" 
				onClick={showSectionFavRecipe} > 
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes recettes favorites
			</h2>
			<div className="SectionContent">
				<DisplayMyFavRecipe favRecipes={favRecipes} handleDeleteFavRecipe={handleDeleteFavRecipe} />
			</div>
		</div>
	)
}

export default MyFavRecipes
