import React from 'react';
import { NavLink } from 'react-router-dom';

const FeatureBlock = ( {id: key, featureBlocksData} ) => {
    
    const featureBlockData = featureBlocksData[key]
    const requireIcon = chemin => {
        try {
            return require(`../icons/${chemin}`)
        } catch (err) {
            return require(`../icons/users.svg`)
        }
    }

    return (
        <h2 className="featureBlock">
            <NavLink to={featureBlockData.route}>
                <img className="icon" src={requireIcon(featureBlockData.icon)} alt={featureBlockData.title}/>
                <span>{featureBlockData.title}</span>
            </NavLink>
        </h2>
    );
};

export default FeatureBlock;