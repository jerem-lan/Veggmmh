import React from 'react';

const Header = ({username}) => {
    // test() verifie si ya une correspondance entre un texte et une regex retourne vrai ou faux
    const formatPseudo = (username) => /[aeiouy]/i.test(username[0]) ? `d'${username}` : `de ${username}`
    return (
        <header>
            <h1>Bonjour {formatPseudo(username)}</h1>
        </header>
    );
};

export default Header;