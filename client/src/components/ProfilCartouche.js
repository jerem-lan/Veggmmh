import React from 'react';

const ProfilCartouche = ({username, isConnected}) => {

    function showSectionPersonnalInfos() {
        document.querySelectorAll(".edit--prsonnalInfos, .icon--edit").forEach(e => {
            e.classList.toggle("active");
        })
    } 


    if(isConnected) {
        return (
            <div className="profilCartouche">
                <div>
                    <svg className="icon--avatar" viewBox='0 0 46 46' fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="23" cy="23" r="21.5" stroke="#56B693" strokeWidth="3"/><path d="M11.56 39.111a1.007 1.007 0 101.801.9 10.925 10.925 0 014.302-4.55c.8.442 1.664.79 2.579 1.027a1.008 1.008 0 00.506-1.95 9.03 9.03 0 01-2.575-1.123c-.001 0-.002 0-.003-.002a9.088 9.088 0 01-4.218-7.67c0-5.013 4.077-9.09 9.088-9.09 5.012 0 9.09 4.077 9.09 9.09a9.102 9.102 0 01-4.21 7.669c-.01.006-.02.014-.032.02a9.02 9.02 0 01-1.156.619 1.006 1.006 0 10.818 1.84c.296-.132.581-.278.862-.433a10.869 10.869 0 014.494 4.947 1.008 1.008 0 001.838-.825 12.895 12.895 0 00-4.527-5.366 11.12 11.12 0 003.926-8.472c0-5.782-4.445-10.54-10.096-11.052v-2.244c.312.065.63.11.951.11H25c.898 0 1.77-.265 2.52-.762a4.542 4.542 0 002.005-4.433l-.066-.484-.42-.248c-1.48-.878-3.424-.836-4.863.12-.45.299-.824.67-1.135 1.084a4.592 4.592 0 00-1.133-1.084c-1.44-.954-3.383-.998-4.865-.12l-.42.248-.065.484a4.545 4.545 0 002.003 4.433 4.551 4.551 0 002.523.761c.32 0 .638-.043.95-.11v2.245c-5.651.511-10.095 5.27-10.095 11.052a11.1 11.1 0 003.931 8.47 12.954 12.954 0 00-4.31 4.9zM25.288 8.428a2.586 2.586 0 012.258-.282 2.537 2.537 0 01-1.14 1.969c-.42.278-.907.425-1.408.425-.291 0-.578-.049-.85-.143a2.539 2.539 0 011.14-1.97zm-5.616 1.687a2.538 2.538 0 01-1.14-1.969 2.59 2.59 0 012.26.282 2.54 2.54 0 011.14 1.97 2.595 2.595 0 01-2.26-.283z" fill="#444"/><path d="M19.818 28.722c.63.495 1.836 1.075 3.26 1.075.985 0 2.073-.277 3.15-1.049a1.007 1.007 0 10-1.175-1.636c-2.013 1.443-3.796.174-3.996.022a1.006 1.006 0 00-1.24 1.588zM21.448 23.558c0-.653-.532-1.184-1.184-1.184a1.186 1.186 0 000 2.369c.652 0 1.184-.531 1.184-1.185zM27.001 23.558a1.185 1.185 0 00-2.368 0 1.185 1.185 0 002.368 0z" fill="#444"/>
                    </svg>
                    <p className="text--welcome">
                        <span>Bonjour</span>
                        {username}
                    </p>
                </div>
                <div className="edit">
                    <svg className="icon--edit" onClick={showSectionPersonnalInfos} viewBox='0 0 26 25' fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.95 2.54C20.74.33 19.13 0 18.37 0c-.2 0-.34.02-.4.04l-.24.05L2.3 15.54.45 25l9.73-1.55L25.63 8l.06-.24c.08-.34.31-2.17-2.74-5.22zM2.97 20.9l.84-4.32c.52.1 1.58.5 3.1 2 1.65 1.66 2.1 2.78 2.23 3.32l-4.46.71-1.7-1.7zm6.88-1.43l9.54-9.54c.4.66.52 1.12.56 1.36l-9.43 9.42a7.6 7.6 0 00-.67-1.24zM8.8 18.13a17.07 17.07 0 00-1.19-1.21l9.58-9.58a12.5 12.5 0 011.18 1.21L8.8 18.13zm-2.53-2.27c-.45-.3-.87-.52-1.23-.68l9.4-9.4c.25.03.72.14 1.38.53l-9.55 9.55zM21.3 9.93a10.86 10.86 0 00-2.42-3.32 9.73 9.73 0 00-3.07-2.2l2.7-2.7c.43.05 1.56.35 3.24 2.03 1.85 1.84 2.2 3.03 2.27 3.48L21.3 9.93z" fill="#AADAC9"/>
                    </svg>
                    <p>modifier mon profil</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="profilCartouche">
                <div>
                    <svg className="icon--avatar" viewBox='0 0 46 46' fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="23" cy="23" r="21.5" stroke="#56B693" strokeWidth="3"/><path d="M11.56 39.111a1.007 1.007 0 101.801.9 10.925 10.925 0 014.302-4.55c.8.442 1.664.79 2.579 1.027a1.008 1.008 0 00.506-1.95 9.03 9.03 0 01-2.575-1.123c-.001 0-.002 0-.003-.002a9.088 9.088 0 01-4.218-7.67c0-5.013 4.077-9.09 9.088-9.09 5.012 0 9.09 4.077 9.09 9.09a9.102 9.102 0 01-4.21 7.669c-.01.006-.02.014-.032.02a9.02 9.02 0 01-1.156.619 1.006 1.006 0 10.818 1.84c.296-.132.581-.278.862-.433a10.869 10.869 0 014.494 4.947 1.008 1.008 0 001.838-.825 12.895 12.895 0 00-4.527-5.366 11.12 11.12 0 003.926-8.472c0-5.782-4.445-10.54-10.096-11.052v-2.244c.312.065.63.11.951.11H25c.898 0 1.77-.265 2.52-.762a4.542 4.542 0 002.005-4.433l-.066-.484-.42-.248c-1.48-.878-3.424-.836-4.863.12-.45.299-.824.67-1.135 1.084a4.592 4.592 0 00-1.133-1.084c-1.44-.954-3.383-.998-4.865-.12l-.42.248-.065.484a4.545 4.545 0 002.003 4.433 4.551 4.551 0 002.523.761c.32 0 .638-.043.95-.11v2.245c-5.651.511-10.095 5.27-10.095 11.052a11.1 11.1 0 003.931 8.47 12.954 12.954 0 00-4.31 4.9zM25.288 8.428a2.586 2.586 0 012.258-.282 2.537 2.537 0 01-1.14 1.969c-.42.278-.907.425-1.408.425-.291 0-.578-.049-.85-.143a2.539 2.539 0 011.14-1.97zm-5.616 1.687a2.538 2.538 0 01-1.14-1.969 2.59 2.59 0 012.26.282 2.54 2.54 0 011.14 1.97 2.595 2.595 0 01-2.26-.283z" fill="#444"/><path d="M19.818 28.722c.63.495 1.836 1.075 3.26 1.075.985 0 2.073-.277 3.15-1.049a1.007 1.007 0 10-1.175-1.636c-2.013 1.443-3.796.174-3.996.022a1.006 1.006 0 00-1.24 1.588zM21.448 23.558c0-.653-.532-1.184-1.184-1.184a1.186 1.186 0 000 2.369c.652 0 1.184-.531 1.184-1.185zM27.001 23.558a1.185 1.185 0 00-2.368 0 1.185 1.185 0 002.368 0z" fill="#444"/>
                    </svg>
                    <p className="text--welcome">
                        <span>Bonjour</span>
                        {username}
                    </p>
                </div>
            </div>
        )
    }
};

export default ProfilCartouche;