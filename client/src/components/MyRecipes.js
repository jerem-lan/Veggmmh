import React from 'react'
import Recipe from './Recipe'

const MyRecipes = ({ recipes }) => {
	const myRecipes = recipes.filter(fav => fav.isFav === false)
		.map((recipe, i) => {
			return <Recipe key={i} title={recipe.title} isFav={recipe.isFav} />
		})
	return (
		<div className="Section">
			<h2 className="SectionTitle">
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes recettes
			</h2>
			<div className="SectionContent">
				{myRecipes}
			</div>
		</div>
	)
}

export default MyRecipes
