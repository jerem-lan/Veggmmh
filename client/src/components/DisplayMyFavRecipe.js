import React, { Fragment } from 'react'
import FavButton from './FavButton'


const DisplayFavRecipe = ({ favRecipes }) => {	
 
	return (
		
		<Fragment>
			{ favRecipes.map(recipe =>
				<div 
					key={recipe.id}
					className="Card"
					style={ { backgroundColor: '#e3fcf3'} } 
				>
					<FavButton />
					<div className="CardTitle" key={recipe.id}> 
						{recipe.recipeTitle}
					</div>
						{/* <p>	{"Crée le "+recipe.creationDate} </p> */}					
				</div>
			)}
		</Fragment>
			
	)
}

export default DisplayFavRecipe