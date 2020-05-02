import React from 'react';

const IngredientBlock = ({name, quantity}) => {

    // Ajoute l'icone correspondante au nom de l'ingredient selectionné
    const requireIcon = (name) => {
        try {
            return require(`../icons/ingredients/${name}.svg`)
        } catch (err) {
            return require(`../icons/ingredients/defaut-boissons.svg`)
        }
    }

    return (
        <div className="ingredientBlock">
            <img className="icon" src={requireIcon(name)} alt={name}/>
            <div className="ingredientBlockText">
                <strong>{quantity}</strong>
                <span>{name}</span>
            </div>
            
        </div>
    );
};

export default IngredientBlock;