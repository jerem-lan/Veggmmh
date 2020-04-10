import React from 'react';
import { NavLink } from 'react-router-dom';

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
        <NavLink to={`/${name}`}>
            <div className={classname}>
                <img className="icon" src={requireIcon(icon)} alt={name}/>
                <p className="name">{name}</p>
            </div>
        </NavLink>
    );
};

export default FruitVegBlock;