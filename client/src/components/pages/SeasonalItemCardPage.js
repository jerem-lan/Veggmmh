import React, { useState, useEffect } from 'react';

const SeasonalItemCardPage = (props) => {

    const [Name, setName] = useState([])
    const [Season, setSeason] = useState([])
    const [Icon, setIcon] = useState([])

    useEffect(() => { 
        try {
            window.localStorage.setItem("ingredientIcon", props.location.props.icon.icon);
            window.localStorage.setItem("ingredientName", props.location.props.name.name);
            window.localStorage.setItem("ingredientSeason", JSON.stringify(props.location.props.season.season));
            setName(props.location.props.name.name)
            setSeason(props.location.props.season.season)
            setIcon(props.location.props.icon.icon);
        } 
        catch(error) {
            setName(window.localStorage.getItem("ingredientName"))
            setSeason(JSON.parse(window.localStorage.getItem("ingredientSeason")))
            setIcon(window.localStorage.getItem("ingredientIcon"))
        }
    }, [])

    const requireIcon = Icon => {
        try {
            return require(`../../icons/ingredients/${Icon}`)
        } catch (err) {
            return require(`../../icons/ingredients/defaut-boissons.svg`)
        }
    }

    return (
        <div>
            <div>
                <img src={requireIcon(Icon)} alt={Name}/>
                <h2>{Name}</h2>     
            </div>
            {Season.map((month) => 

                    <p>{month}</p>
                )
            }
        </div>
    );
};

export default SeasonalItemCardPage;