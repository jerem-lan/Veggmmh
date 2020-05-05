import React, { useState } from 'react'
import jwtDecode from 'jwt-decode';
import PaginationForTab from './PaginationForTab'
import DisplayMyFavRecipe from './DisplayMyFavRecipe'


const MyFavRecipes = ({ favRecipes, handleDeleteFavRecipe }) => {

	
	const [CurrentPage, setCurrentPage] = useState(1);
	const [Search, setSearch] = useState([]);

	const handlePageChanged = (page) => {
		setCurrentPage(page)
	}

	function getUsername()  {
		const token = window.localStorage.getItem("authToken")
		const decoded = jwtDecode(token)
    	return decoded.username
	}

	const handleSearch = (event) => {
        const value = event.currentTarget.value;
		setSearch(value);
		setCurrentPage(1);
    }
	
	//Détermine les nombres d'annonces par page
	const itemsPerPage = 5;

	const filteredFavRecipes = favRecipes.filter(
		favRecipe =>
			favRecipe.recipeTitle.toLowerCase().includes(Search.toString().toLowerCase()) ||
			favRecipe.type.toLowerCase().includes(Search.toString().toLowerCase())
		)

	const start = CurrentPage * itemsPerPage - itemsPerPage
	const paginatedFavRecipes = filteredFavRecipes.slice(start, start + itemsPerPage)

	return (
		<div className="SectionFavRecipe">
			<h2 className="SectionTitle"> 
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes recettes favorites
			</h2>
			<input type="text" placeholder="Rechercher" className='input' onChange={handleSearch} value={Search}/>
			{favRecipes.length < 1 ? <p>Vous n'avez pas de recette(s) favorite(s) enregistrée(s)</p> : 
				<>
					<div className="SectionContent">
					{ paginatedFavRecipes.map(recipe =>
						<DisplayMyFavRecipe
							id={recipe.id}
							key={recipe.id}
							title={recipe.recipeTitle}
							type={recipe.type}
							username={getUsername()}
							handleDeleteFavRecipe={handleDeleteFavRecipe} />
					)}
					</div>
					<div>
						<PaginationForTab currentPage={CurrentPage} itemsPerPage={itemsPerPage} length={filteredFavRecipes.length} onPageChanged={handlePageChanged}/>
					</div>
				</>
			}
		</div>
	)
}

export default MyFavRecipes
