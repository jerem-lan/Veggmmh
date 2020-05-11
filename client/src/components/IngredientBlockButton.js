import React from 'react';

const IngredientBlockButton = ({name, handleAdd, value, icon, style}) => {

    // Ajoute l'icone correspondante au nom de l'ingredient selectionné
    const requireIcon = (icon) => {
        try {
            return require(`../icons/ingredients/${icon}`)
        } catch (err) {
            return require(`../icons/ingredients/defaut-boissons.svg`)
        }
    }
    const normalizedFamily = style.normalize("NFD").replace(/\s/g, '-').replace(/[\u0300-\u036f]/g, "")
    const classNames = "ingredientBlock ingredientBlock--button " + normalizedFamily
    const iconStyle = {
        backgroundImage: `url(${requireIcon(icon)})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 15px"
      };
    return (
        <button className={classNames} onClick={handleAdd} value={value} style={iconStyle}>
            {name}
        </button>
    );
};
export default IngredientBlockButton;