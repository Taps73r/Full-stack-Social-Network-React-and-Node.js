import React from 'react';
import preloaderSvg from './../../../photos/preloader.svg';
let Preloader = () => {
    return (
        <div>
            <img src={preloaderSvg} alt='preloader' />
        </div>
    )
}

export default Preloader;