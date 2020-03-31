import React from 'react';

const FeatureBlock = ({id: key, featureBlocksData}) => {
    console.log(featureBlocksData[key])
    const featureBlockData = featureBlocksData[key]

    const requireIcon = chemin => {
        try {
            return require(`../icons/${chemin}`)
        } catch (err) {
            return require(`../icons/users.svg`)
        }
    }
    return (
        <div className="featureBlock">
            <img className="icon" src={requireIcon(featureBlockData.icon)} alt={featureBlockData.title}/>
            <h2 className="title">{featureBlockData.title}</h2>
        </div>
    );
};

export default FeatureBlock;