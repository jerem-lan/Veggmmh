import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const DisplayMyRecipe = ({id, title, handleDeleteRecipe}) => {	

	return (	
		<Fragment>
			<div 
				key={id}
				className="Card"
				style={ { backgroundColor: '#e3fcf3'} } 
			>
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
				{/* <p>	{"Crée le "+recipe.creationDate} </p> */}	
				<div className="Tools">
					<button className="btn btn--tool">
						<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect y="0.5" width="24" height="24" fill="#C4C4C4" fillOpacity="0.01"/>
							<path d="M18.2409 6.1945C16.8423 4.79572 15.8243 4.58667 15.3419 4.58667C15.2124 4.58667 15.1275 4.60189 15.0884 4.6109L14.9386 4.64542L5.16251 14.4217L4 20.4133L10.1588 19.4315L19.9415 9.64858L19.9763 9.49871C20.0251 9.28602 20.1727 8.12609 18.2409 6.1945ZM5.59497 17.8207L6.12669 15.0797C6.45238 15.1438 7.12626 15.3955 8.08315 16.3522C9.12988 17.3991 9.41933 18.1093 9.49802 18.4515L6.67536 18.9015L5.59497 17.8207ZM9.94677 16.9146L15.9909 10.8705C16.2413 11.2903 16.3183 11.5806 16.3401 11.7343L10.376 17.6982C10.2785 17.4675 10.1404 17.206 9.94677 16.9146ZM9.28275 16.0625C9.14896 15.9118 9.00295 15.7557 8.84129 15.5941C8.73559 15.4884 8.63224 15.3904 8.53104 15.2978L14.5938 9.23521C14.6948 9.3259 14.7977 9.42196 14.9058 9.53002C15.0715 9.69575 15.2152 9.85163 15.3451 10.0004L9.28275 16.0625ZM7.68521 14.628C7.39598 14.4346 7.13333 14.2952 6.90113 14.1991L12.8569 8.24358C13.0132 8.26223 13.3095 8.33427 13.7295 8.58363L7.68521 14.628ZM17.1986 10.8758C16.9705 10.3375 16.5232 9.63122 15.6639 8.77188C14.8893 7.99744 14.2351 7.58836 13.7237 7.37652L15.4351 5.66513C15.7027 5.69794 16.4205 5.89004 17.4829 6.95243C18.6512 8.12094 18.8766 8.8705 18.9179 9.15631L17.1986 10.8758Z" fill="#3E81EA"/>
						</svg>
					</button>
					<button className="btn btn--tool" onClick={() => handleDeleteRecipe(id)}>
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

export default DisplayMyRecipe