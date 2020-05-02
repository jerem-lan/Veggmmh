import React, { useState } from 'react'
import DisplayMyAds from './DisplayMyAds'
import PaginationForTab from './PaginationForTab'
import jwtDecode from 'jwt-decode';

const MyAds = ({ Ads, handleDeleteAds }) => {

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

	function getCurrentIdUser () {
        const token = window.localStorage.getItem("authToken")
        const decoded = jwtDecode(token)
    	return decoded.id
	}
	
	const handleSearch = (event) => {
        const value = event.currentTarget.value;
		setSearch(value);
		setCurrentPage(1);
    }
	
	//Détermine les nombres d'annonces par page
	const itemsPerPage = 5;

	const filteredAds = Ads.filter(
		ad =>
			ad.title.toLowerCase().includes(Search.toString().toLowerCase())
		)

	const start = CurrentPage * itemsPerPage - itemsPerPage
	const paginatedAds = filteredAds.slice(start, start + itemsPerPage)


	return (
		<div className="SectionMyAds">
			<h2 className="SectionTitle">
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes annonces
			</h2>
			<input type="text" placeholder="Rechercher" className='input' onChange={handleSearch} value={Search}/>
			{Ads.length < 1 ? <p>Vous n'avez pas d'annonce(s) enregistrée(s)</p> : 
				<>
					<div className="SectionContent">
					{ paginatedAds.map(ad =>
						<DisplayMyAds
							id={ad.id}
							key={ad.id}
							title={ad.title}
							content={ad.content}
							postcode={ad.postcode}
							creationDate={ad.creationDate}
							modificationDate={ad.modificationDate}
							userEmail = {ad.user.email}
							userId = {ad.user.id}
							username={getUsername()}
							currentIdUser={getCurrentIdUser()}
							handleDeleteAds={handleDeleteAds} />
					)}
					</div>
					<div>
						<PaginationForTab currentPage={CurrentPage} itemsPerPage={itemsPerPage} length={filteredAds.length} onPageChanged={handlePageChanged}/>
					</div>
				</>
			}
		</div>
	)
}

export default MyAds