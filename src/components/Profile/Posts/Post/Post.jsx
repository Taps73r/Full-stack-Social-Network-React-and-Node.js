import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Post.css';

function Post(props) {
    const [expanded] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const photos = props.photos.map((photo, index) => (
        <div key={index}>
            <img src={photo} alt={`Post ${index + 1}`} />
        </div>
    ));

    const messageToShow = expanded ? props.message : wrapText(props.message, 46);
    return (
        <div className='posts'>
            <div className='userPhoto'>
                <img src={props.profileData.photo} alt='' />
                <p>{props.profileData.name}</p>
            </div>
            <div className='postPhotos'>
                <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{messageToShow}</p>
                <Slider {...settings}>{photos}</Slider>
            </div>
        </div>
    );
}

function wrapText(text, maxLength) {
    const words = text.split(' ');
    let currentLine = '';
    let result = '';

    for (const word of words) {
        if ((currentLine + word).length <= maxLength) {
            currentLine += word + ' ';
        } else {
            result += currentLine.trim() + '\n';
            currentLine = word + ' ';
        }
    }
    result += currentLine.trim();
    return result;
}

export default Post;
