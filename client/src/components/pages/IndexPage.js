import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class IndexPage extends Component {

    render() {
        return (
            <div className="container container--index">
                <p className='medium--text'>Veggmmh, l’appli collaborative qui facilite et accompagne ta transition alimentaire, sans te faire culpabiliser !</p>
                <p className='regular--text'>Retrouve le calendrier des fruits et légumes de saison et leur fiche info. Mais également de nombreuses idées recettes basées sur ce que tu as déjà, ainsi qu'une communautée de trocs et de dons réunie autour d’un objectif commun : adopter une consommation végétale et raisonnée, plus saine et éco responsable, sans gaspillage alimentaire.</p>
                <Link to="/dashboard">
                    <button className="btn--visit">
                        <svg width="25" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.8 14.4l.3.3 3.7 3.7c1 1 1 2.5.3 3.6a2.9 2.9 0 01-4.4.4L.9 13.6a2.8 2.8 0 010-4.1L9.5.9c1.2-1.2 3-1.2 4.1 0 1.1 1 1.1 2.9 0 4L10 8.4l-.2.2v.2H22a3 3 0 013 2.1c.4 1.9-1 3.6-2.9 3.6H9.8z" fill="#FBFCFF"/>
                        </svg>
                    </button>
                </Link>
                {/* <div className="btn--group">
                    <Link to="/register">
                        <button className="btn">créer un compte</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn--subscription">se connecter</button>
                    </Link>
                </div> */}
            </div>
        );
    }
}

export default IndexPage;