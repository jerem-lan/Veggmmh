import React from 'react';

const FruitVegBlock = (
    {id,
    family,
    name}
    ) => {

    // const requireIcon = chemin => {
    //     try {
    //         return require(`../icons/ingredients/${chemin}`)
    //     } catch (err) {
    //         return require(`../icons/ingredients/default.svg`)
    //     }
    // }

    const classname = "fruitBlock " + family

    return (
        <div className={classname}>
            {/* <img className="icon" src={requireIcon(featureBlockData.icon)} alt={featureBlockData.title}/> */}
            <p className="name">{name}</p>
        </div>
    );
};

export default FruitVegBlock;