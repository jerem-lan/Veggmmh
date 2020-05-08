import React from 'react'

const FavTool = () => {
	return (
		<button className="btn btn--favorite" type="submit">
			<svg viewBox="0 0 30 30" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="15" cy="15" r="15"/>
				<path d="M15 22c-1.48 0-8.3-4.75-8.3-9.75C6.7 9.9 8.6 8 10.94 8c1.94 0 3.3 1.48 4.06 2.62C15.76 9.48 17.12 8 19.06 8c2.34 0 4.24 1.9 4.24 4.25 0 5-6.82 9.75-8.3 9.75zM10.94 9.58a2.67 2.67 0 00-2.66 2.67c0 3.99 5.7 7.85 6.72 8.16 1.02-.3 6.72-4.17 6.72-8.16 0-1.48-1.19-2.67-2.66-2.67-2.06 0-3.32 2.94-3.34 2.97-.12.3-.4.48-.72.48-.32 0-.6-.19-.72-.48-.02-.03-1.28-2.97-3.34-2.97z"/>
			</svg>
		</button>
	)
}

export default FavTool