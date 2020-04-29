import React, { useState, useEffect } from 'react'
import DisplayMyAds from './DisplayMyAds'
import PaginationForTab from './PaginationForTab'
import jwtDecode from 'jwt-decode';

const MyAds = ({ Ads, handleDeleteAds }) => {

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
	const paginatedAds = Ads.slice(start, start + itemsPerPage)

	return (
		<div className="SectionMyAds">
			<h2 className="SectionTitle">
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes annonces
			</h2>
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
					username={getUsername()}
					handleDeleteAds={handleDeleteAds} />
			)}
			</div>
			<div>
              <PaginationForTab currentPage={CurrentPage} itemsPerPage={itemsPerPage} length={Ads.length} onPageChanged={handlePageChanged}/>
            </div>
		</div>
	)
}

export default MyAds