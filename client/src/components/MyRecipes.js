import React from 'react'
import DisplayMyRecipe from './DisplayMyRecipe'

const MyRecipes = ({ Recipes, handleDeleteRecipe }) => {
	
	function showSectionMyRecipe() {
		document.querySelector(".SectionMyRecipe").classList.toggle("hideSection")
	}

	return (
		<div className="SectionMyRecipe">
			<h2 className="SectionTitle" onClick={showSectionMyRecipe}>
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes recettes
			</h2>
			<div className="SectionContent">
				<DisplayMyRecipe Recipes={Recipes} handleDeleteRecipe={handleDeleteRecipe} />
			</div>
		</div>
	)
}

export default MyRecipes
