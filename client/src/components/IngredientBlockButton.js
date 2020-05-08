import React from 'react';

const IngredientBlockButton = ({name, handleAdd, value, icon}) => {

    // Ajoute l'icone correspondante au nom de l'ingredient selectionné
    const requireIcon = (name) => {
        try {
            return require(`../icons/ingredients/${icon}`)
        } catch (err) {
            return require(`../icons/ingredients/defaut-boissons.svg`)
        }
    }
    const test = {
        backgroundImage: `url(${requireIcon(icon)})`,
        backgroundRepeat: "no-repeat"
      };
    return (
        <button className="ingredientBlock" onClick={handleAdd} value={value} style={test}>
            {name}
        </button>
    );
};
export default IngredientBlockButton;