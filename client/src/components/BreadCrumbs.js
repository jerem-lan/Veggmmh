import React from 'react';

const BreadCrumbs = ({history}) => {
    const handleBack = () => {
        history.goBack();
    } 

    return (
        <div className="container--breadCrumbs">
            <div className="breadCrumbs" onClick={handleBack}>
                <svg viewBox="0 0 20 20" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h20v20H0z"/><path d="M14 19l-8-9 8-9" stroke="#FCFBF7" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
                <div className="breadCrumbs--title">Retour</div>
            </div>
        </div>
    );
};

export default BreadCrumbs;