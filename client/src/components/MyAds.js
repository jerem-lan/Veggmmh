import React from 'react'
import DisplayMyAds from './DisplayMyAds'

const MyAds = ({ Ads, handleDeleteAds }) => {
	
	function showSectionMyAds() {
		document.querySelector(".SectionMyAds").classList.toggle("hideSection")
	}

	return (
		<div className="SectionMyAds">
			<h2 className="SectionTitle" onClick={showSectionMyAds}>
				<svg className="iconArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.5 5L7 9L2.5 5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
				Mes annonces
			</h2>
			<div className="SectionContent">
			{ Ads.map(ad =>
				<DisplayMyAds
					id={ad.id}
					key={ad.id}
					title={ad.title}
					content={ad.content}
					postcode={ad.postcode}
					handleDeleteAds={handleDeleteAds} />
			)}
			</div>
		</div>
	)
}

export default MyAds