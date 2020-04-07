import React from 'react';
import { NavLink } from 'react-router-dom';

const FeatureBlock = ({id: key, featureBlocksData}) => {
    const featureBlockData = featureBlocksData[key]

    const requireIcon = chemin => {
        try {
            return require(`../icons/${chemin}`)
        } catch (err) {
            return require(`../icons/users.svg`)
        }
    }
    return (
        <NavLink to={featureBlockData.route}>
        <div className="featureBlock">
            <img className="icon" src={requireIcon(featureBlockData.icon)} alt={featureBlockData.title}/>
            <h2 className="title">{featureBlockData.title}</h2>
        </div>
        </NavLink>
    );
};

export default FeatureBlock;