import React from 'react';
import { NavLink } from 'react-router-dom';

const FruitVegBlock = ( {id, family, name, icon, season} ) => {

    const requireIcon = icon => {
        try {
            return require(`../icons/ingredients/${icon}`)
        } catch (err) {
            return require(`../icons/ingredients/defaut-boissons.svg`)
        }
    }
    const classname = "fruitVegBlock " + family

    return (
        <div className={classname}>
            <NavLink to={{
                pathname: `/${name}`,
                props: {
                    name: {name},
                    icon: {icon},
                    season: {season}
                }
            }}>
                <img className="icon" src={requireIcon(icon)} alt={name}/>
                <span>{name}</span>
            </NavLink>
        </div>
    );
};

export default FruitVegBlock;