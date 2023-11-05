import React from 'react';
import './Preloader.css';
import preloaderSvg from './../../../photos/preloader.svg';
let Preloader = () => {
    return (
        <div className='Preloader'>
            <img src={preloaderSvg} alt='preloader' />
        </div>
    )
}

export default Preloader;