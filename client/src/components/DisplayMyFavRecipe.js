import React, { Fragment } from 'react'
import FavButton from './FavButton'


const DisplayFavRecipe = ({ favRecipes, handleDeleteFavRecipe }) => {	
 
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
					<div className="Tools">
						<button className="btn" onClick={() => handleDeleteFavRecipe(recipe.id)}>
							<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.9933 6.49329L6.00034 18.5" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
								<path d="M5.99316 6.49329L17.6059 18.1061" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
							</svg>
						</button>
					</div>
						{/* <p>	{"Crée le "+recipe.creationDate} </p> */}					
				</div>
			)}
		</Fragment>
			
	)
}

export default DisplayFavRecipe