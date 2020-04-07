import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthApi from '../services/authApi';


const Header = ({isConnected, onLogout}) => {

    const handleLogout = () => {
        AuthApi.logout();
        onLogout(false)
    } 

    if(isConnected) {
        return (
            <header>
                <div className="header">
                    <NavLink to="/" >
                        <button>
                            <svg className='icon--header' viewBox='0 0 30 30' fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="15" fill="#AADAC9"/><path d="M19.2 10.8l-8.77 8.77M10.8 10.8l8.49 8.49" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </NavLink>
                    <h1 className="header--title">Vegg'mmh ! </h1>
                    <div>
                        <svg className='icon--header' viewBox="0 0  30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#AADAC9"/><path d="M12.63 9.72c-.07.05-1.84 1.07-2.1 2.9-.04.26.14.5.4.54H11c.23 0 .42-.16.47-.4.18-1.36 1.6-2.2 1.62-2.2.24-.12.3-.42.17-.63-.12-.28-.4-.35-.63-.2z" fill="#fff"/><path d="M20.42 7.8c-.82 0-1.58.2-2.26.6a7.4 7.4 0 00-1.65-.87c.02-.13.05-.3.05-.44 0-1.16-.93-2.09-2.1-2.09a2.08 2.08 0 00-2.04 2.53c-1.75.63-4.12 2.21-4.12 6.12 0 4.19-.95 5.47-1.53 5.84a1.75 1.75 0 00.97 3.18h3.89a2.91 2.91 0 005.7.02h3.88c.95 0 1.74-.78 1.74-1.74 0-.58-.28-1.11-.76-1.44-.42-.28-.98-1-1.28-2.65a4.6 4.6 0 004.04-4.53 4.53 4.53 0 00-4.53-4.54zm-5.93-1.87c.65 0 1.16.51 1.16 1.16 0 .07 0 .12-.02.19-.96-.21-1.84-.1-2.3 0 0-.07-.03-.12-.03-.19.03-.65.54-1.16 1.19-1.16zm-5.23 7.72a5.15 5.15 0 014-5.4h.02s1.16-.39 2.44 0c.6.17 1.16.42 1.65.73a4.54 4.54 0 002.58 7.86c.19 1.09.5 1.95.91 2.58H8.12c.74-1.16 1.14-3.1 1.14-5.77zm5.23 10.42a2 2 0 01-1.89-1.37h3.77a2 2 0 01-1.88 1.37zm7.28-3.72c.16.16.28.37.28.6 0 .45-.38.82-.82.82H7.77a.82.82 0 01-.82-.82c0-.23.1-.44.28-.6h14.54zm-1.35-4.42a3.62 3.62 0 01-3.6-3.6c0-1.98 1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6c0 1.97-1.62 3.6-3.6 3.6z" fill="#fff"/>
                        </svg>
                        <NavLink to="/" >
                            <button onClick={handleLogout}>
                                <svg className='icon--header' viewBox='0 0 30 30' fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15" r="15" fill="#AADAC9"/><path d="M19.2 10.8l-8.77 8.77M10.8 10.8l8.49 8.49" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </header>
        );
    } else 
    {
        return (
            <header>
                <div className="header">
                    <h1 className="header--title">Vegg'mmh ! </h1>
                </div>
            </header>
        );
    }
};

export default Header;