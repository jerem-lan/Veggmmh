import React, { Fragment } from 'react';

const AlertMessage = ({message}) => {
    return (
        <Fragment>
            <div className='alert--error'>
                <svg className='icon--error' viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6.41" cy="6.59" r="5.91" stroke="#E94C4C"/><path d="M6.42 8.05c-.26 0-.4-.15-.42-.43l-.33-4.15a.79.79 0 01.18-.59.71.71 0 01.56-.24.73.73 0 01.73.82l-.32 4.16c-.02.28-.15.43-.4.43zm-.08 2.5a.71.71 0 01-.5-.18.71.71 0 01-.18-.5v-.2c0-.22.06-.38.17-.5a.69.69 0 01.5-.17h.16c.21 0 .38.06.5.18.11.1.17.27.17.5v.18c0 .22-.06.4-.18.51-.11.12-.28.17-.5.17h-.14z" fill="#E94C4C"/>
                </svg>
                <p>{message}</p>
            </div>
        </Fragment>
    );
};

export default AlertMessage;