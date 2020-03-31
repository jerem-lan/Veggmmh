import React from 'react'
import Tools from './Tools'
import FavButton from './FavButton'

const Recipe = ({title, isFav}) => {	
	return (
		<div 
			className="Card"
			style={ { backgroundColor: isFav ? '#e3fcf3' : 'ecf5ee' } } >
			{isFav
				? (<FavButton/>)
				: null 
			}
			<div className="CardTitle">
				{title}
			</div>
			{!isFav
				? (<Tools />)
				: null
			}
		</div>
	)
}

export default Recipe