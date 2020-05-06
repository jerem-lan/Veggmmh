import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthApi from '../services/authApi';
import { toast } from 'react-toastify';

const Header = ({isConnected, onLogout, history}) => {

    const handleLogout = () => {
        AuthApi.logout();
        onLogout(false);
        toast.info("À très vite ! 🍃 ")
        history.push("/");
    } 

    const isAdmin = AuthApi.isAdmin();
    return (
        <> {isConnected ? (<header>
            <div className="header">
                <NavLink to="/dashboard" className="header--iconGroup" title="Accueil">
                    <svg className='icon--header' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#AADAC9"/><path d="M22.96 12.69l-2.18-1.86v-2.9a1.66 1.66 0 10-3.32 0v.06l-2.04-1.74a1.06 1.06 0 00-1.37 0L6.5 12.7a1.8 1.8 0 001.02 3.16h.15c.1 0 .22-.01.33-.04v6.28A1.9 1.9 0 009.9 24h9.64a1.9 1.9 0 001.9-1.9v-6.27a1.8 1.8 0 001.51-3.14zM18.3 7.92a.81.81 0 011.63 0v2.18L18.3 8.71v-.79zm-2.12 15.23h-2.9v-3.04a1.46 1.46 0 112.9 0v3.04zm3.37 0h-2.52v-3.04a2.3 2.3 0 10-4.6 0v3.04H9.9a1.06 1.06 0 01-1.06-1.06v-6.67l5.75-4.9a.21.21 0 01.27 0l5.74 4.9v6.67a1.06 1.06 0 01-1.06 1.06zm2.96-8.47a.95.95 0 01-1.34.1l-5.75-4.9a1.06 1.06 0 00-1.37 0l-5.76 4.9a.95.95 0 11-1.24-1.44L14.6 6.9a.21.21 0 01.27 0l7.54 6.44a.95.95 0 01.1 1.34z" fill="#fff"/>
                    </svg>
                    <h1 className="header--title">Vegg'mmh !</h1>
                </NavLink>
                
                <div className="flexBlock"> 
                    {isAdmin && <NavLink to="/admin/dashboard" className="adminBoardBtn" title="Panneau administrateur">
                        <span>Panneau admin</span>
                        <svg className='icon--header' viewBox="0 0 31 31" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M.5 1h30v30H.5z"/><path d="M26.8 16s-5 7-11.3 7c-6.3 0-11.3-7-11.3-7s5-7 11.3-7c6.2 0 11.3 7 11.3 7z" stroke="#fff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 20.6a4.6 4.6 0 100-9.2 4.6 4.6 0 000 9.2z" stroke="#fff" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 18a2 2 0 100-4 2 2 0 000 4z" fill="#fff"/>
                        </svg>
                    </NavLink>}
                    <svg onClick={handleLogout} className='icon--header icon--logout' viewBox='0 0 30 30' fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title>Se déconnecter</title>
                        <circle cx="15" cy="15" r="15" fill="#AADAC9"/><path d="M19.2 10.8l-8.77 8.77M10.8 10.8l8.49 8.49" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        </header>) 
        :
        (<header>
            <div className="header">
                <h1 className="header--title">
                    <NavLink to="/dashboard">Vegg'mmh !</NavLink>
                </h1>
                <div className="btn--group btn--group--noWrap">
                    <NavLink to="/register">
                        <button className="btn">Créer un compte</button>
                    </NavLink>
                    <NavLink to="/login">
                        <button className="btn btn--subscription">Se connecter</button>
                    </NavLink>
                </div>
            </div>
        </header>)} </>
    )
};

export default Header;