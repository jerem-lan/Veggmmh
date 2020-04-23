import React, { useState, useEffect } from 'react';

const SeasonalItemCardPage = (props) => {

    const [Name, setName] = useState([]) // nom du fruit ou légume
    const [Season, setSeason] = useState([]) //tableau avec mois de disponibilité du fruit ou légume
    const [Icon, setIcon] = useState([]) // icone propre au fruit ou légume ciblé

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

    // Affiche l'icone propre au fruit/légume sélectionné. 
    const requireIcon = Icon => {
        try {
            return require(`../../icons/ingredients/${Icon}`)
        } catch (err) {
            return require(`../../icons/ingredients/defaut-boissons.svg`)
        }
    }

    // Affiche le calendrier avec marqueurs sur les mois qui correspondent à la disponibilité du fruit/légume.
    const month = document.querySelectorAll(".month");
    const first = Season[0];
    const last = Season[Season.length -1];
    month.forEach(e=> {
        if (Season.includes(e.dataset.month)) {
            e.querySelector(".number").classList.add("active")
        }
    })
    month.forEach(e=> {
        if (e.dataset.month === first || e.dataset.month === last)  {
            e.querySelector(".number").classList.add("marker")
        }
    })

    return (
        <div className="container">
            <div className="fruitVegName">
                <img src={requireIcon(Icon)} alt={Name}/>
                <h2>{Name}</h2>    
            </div>
            <div className="calendar">
                <div data-month="janvier" className="month">
                    <div className="name">jan</div>
                    <div className="number">01</div>
                </div>
                <div data-month="février" className="month">
                    <div className="name">fév</div>
                    <div className="number">02</div>
                </div>
                <div data-month="mars" className="month">
                    <div className="name">mar</div>
                    <div className="number">03</div>
                </div>
                <div data-month="avril" className="month">
                    <div className="name">avr</div>
                    <div className="number">04</div>
                </div>
                <div data-month="mai" className="month">
                    <div className="name">mai</div>
                    <div className="number">05</div>
                </div>
                <div data-month="juin" className="month">
                    <div className="name">juin</div>
                    <div className="number">06</div>
                </div>
                <div data-month="juillet" className="month">
                    <div className="name">juil</div>
                    <div className="number">07</div>
                </div>
                <div data-month="août" className="month">
                    <div className="name">août</div>
                    <div className="number">08</div>
                </div>
                <div data-month="septembre" className="month">
                    <div className="name">sep</div>
                    <div className="number">09</div>
                </div>
                <div data-month="octobre" className="month">
                    <div className="name">oct</div>
                    <div className="number">10</div>
                </div>
                <div data-month="novembre" className="month">
                    <div className="name">nov</div>
                    <div className="number">11</div>
                </div>
                <div data-month="décembre" className="month">
                    <div className="name">déc</div>
                    <div className="number">12</div>
                </div>
            </div>
            <div>
                <h2>Conservation</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sit dolor obcaecati soluta earum, ut aspernatur atque aperiam provident, maxime ratione perspiciatis eligendi ab molestias debitis ipsum quos reprehenderit. Tenetur?</p>
            </div>
        </div> 
    );
};

export default SeasonalItemCardPage;