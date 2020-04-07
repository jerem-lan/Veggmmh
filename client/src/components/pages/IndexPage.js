import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';


class IndexPage extends Component {

    render() {
        return (
            <Fragment>
                <div className="Content">
                    <p className='medium--text'>Veggmmh, l’appli collaborative qui facilite et t’accompagne dans ta transition alimentaire, sans culpabiliser !</p>
                    <p className='regular--text'>Retrouve le calendrier des fruits et légumes de saison et leur fiche info, de nombreuses idées recettes basées sur ce que tu as déjà, une communautée de trocs et de dons. Réunis autour d’un objectif commun : adopter une consommation végétale et raisonnée, plus saine et éco responsable sans gaspillage alimentaire.</p>
                    <div className="btn--group">
                        <Link to="/register">
                            <button className="btn">créer un compte</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn btn--subscription">se connecter</button>
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default IndexPage;