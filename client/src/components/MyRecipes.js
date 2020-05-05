import React, { useState } from 'react'
import DisplayMyRecipe from './DisplayMyRecipe'
import jwtDecode from 'jwt-decode';
import PaginationForTab from './PaginationForTab'


const MyRecipes = ({ Recipes, handleDeleteRecipe }) => {
	
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

	const filteredRecipes = Recipes.filter(
		recipe =>
			recipe.recipeTitle.toLowerCase().includes(Search.toString().toLowerCase()) ||
			recipe.type.toLowerCase().includes(Search.toString().toLowerCase())
		)

	const start = CurrentPage * itemsPerPage - itemsPerPage
	const paginatedRecipes = filteredRecipes.slice(start, start + itemsPerPage)

	return (
		<div className="SectionMyRecipe">
			<h2 className="SectionTitle">
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes recettes
			</h2>
			<input type="text" placeholder="Rechercher" className='input' onChange={handleSearch} value={Search}/>
			{Recipes.length < 1 ? <p>Vous n'avez pas de recette(s) enregistrée(s)</p> : 
				<>
					<div className="SectionContent">
						{ paginatedRecipes.map(recipe =>
							<DisplayMyRecipe
								id={recipe.id}
								key={recipe.id}
								title={recipe.recipeTitle}
								type={recipe.type}
								username={getUsername()}
								handleDeleteRecipe={handleDeleteRecipe} />
						)}
					</div>
					<div>
						<PaginationForTab currentPage={CurrentPage} itemsPerPage={itemsPerPage} length={filteredRecipes.length} onPageChanged={handlePageChanged}/>
					</div>
				</>	
			}
		</div>
	)
}

export default MyRecipes
