import React from 'react'
import Tools from './Tools'
import FavButton from './FavButton'

const Recipe = ({title}) => {	
	return (
		<div 
			className="Card"
			style={ { backgroundColor: '#e3fcf3'} } >
			
			 <FavButton/>
			
			<div className="CardTitle">
				{title}
			</div>
			? (<Tools />)
			</div>
	)
}

export default Recipe