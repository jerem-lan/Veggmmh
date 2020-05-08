import React, { Fragment } from 'react'
import FavButton from './FavButton'
import { NavLink } from 'react-router-dom'

const DisplayFavRecipe = ({ id, title, type, handleDeleteFavRecipe }) => {	
 
	return (
		
		<Fragment>
				<div 
					key={id}
					className="Card"
					style={ { backgroundColor: '#e3fcf3'} } 
				>
					{/* <FavButton /> */}
                    <p class="recipeTypeTag recipeTypeTag--table">{type}</p>
					<NavLink to={{
						pathname: `/recette/${id}`,
						props: {
						id : `${id}`
						}
					}}>
						<div className="CardTitle"> 
							{title}
						</div>
					</NavLink>
					<div className="Tools">
						<button className="btn btn--tool" onClick={() => handleDeleteFavRecipe(id)}>
							<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.9933 6.49329L6.00034 18.5" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
								<path d="M5.99316 6.49329L17.6059 18.1061" stroke="#E94C4C" strokeWidth="2" strokeLinecap="round"/>
							</svg>
						</button>
					</div>				
				</div>
		</Fragment>
			
	)
}

export default DisplayFavRecipe