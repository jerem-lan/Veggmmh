import React from 'react';


const PaginationForTab = ({ currentPage, itemsPerPage, length, onPageChanged}) => {
    
    // Détermine le nombre de page en fonction du nombre d'annonces. Arrondi à l'entier supérieur
    const pageCount = Math.ceil(length / itemsPerPage)
    const pages = [];
    // Boucle pour alimenter le tableau pages. Pour ensuite .map le tableau et déterminer combien de li on affiche
    for(let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return ( 
        <div>
            <ul className="pagination">
                <li className={"inlineDisplay " + ( currentPage === 1 && "disabled")}>
                    <button className="paginationButton" onClick={() => onPageChanged(currentPage - 1)}>&laquo;</button>
                </li>
                    {pages.map( page => (
                        <li key={page} className={"inlineDisplay " + ( currentPage === page && "activePage")}>
                            <button className="paginationButton" onClick={() => onPageChanged(page)}>
                                {page}
                            </button>
                        </li>
                    ))} 
                <li className={"inlineDisplay " + ( currentPage === pageCount && "disabled")}>
                    <button className="paginationButton" onClick={() => onPageChanged(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    );
}
 
export default PaginationForTab;
                    