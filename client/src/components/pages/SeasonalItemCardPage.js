import React from 'react';

const SeasonalItemCardPage = (props) => {
    const name = props.location.props.name.name;
    const icon = props.location.props.icon.icon;
    const season = props.location.props.season.season;
    const requireIcon = icon => {
        try {
            return require(`../../icons/ingredients/${icon}`)
        } catch (err) {
            return require(`../../icons/ingredients/defaut-boissons.svg`)
        }
    }
    return (
        <div>
            <div>
                <img src={requireIcon(icon)} alt={name}/>
                <h2>{name}</h2>     
            </div>
            {season}
        </div>
    );
};

export default SeasonalItemCardPage;