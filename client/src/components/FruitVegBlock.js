import React from 'react';

const FruitVegBlock = (
    {id,
    family,
    name,
    icon}
    ) => {

    const classname = "fruitVegBlock " + family
    const requireIcon = icon => {
        try {
            return require(`../icons/ingredients/${icon}`)
        } catch (err) {
            return require(`../icons/ingredients/defaut-boissons.svg`)
        }
    }

    return (
        <div className={classname}>
            <img className="icon" src={requireIcon(icon)} alt={name}/>
            <p className="name">{name}</p>
        </div>
    );
};

export default FruitVegBlock;