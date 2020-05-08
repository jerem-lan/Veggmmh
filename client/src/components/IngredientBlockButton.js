import React from 'react';

const IngredientBlockButton = ({name, handleAdd}) => {

    // Ajoute l'icone correspondante au nom de l'ingredient selectionné
    const requireIcon = (name) => {
        try {
            return require(`../icons/ingredients/${name}.svg`)
        } catch (err) {
            return require(`../icons/ingredients/defaut-boissons.svg`)
        }
    }
    const test = {
        backgroundImage: `url(${requireIcon(name)})`,
        backgroundRepeat: "no-repeat"
      };
    return (
        <button className="ingredientBlock" onClick={handleAdd} value={name} style={test}>
            {name}
        </button>
    );
};
export default IngredientBlockButton;