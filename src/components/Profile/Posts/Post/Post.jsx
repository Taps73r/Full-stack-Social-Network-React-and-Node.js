import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Post.css';

function Post(props) {
    const settings = {
        dots: true,
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

    return (
        <div className='posts'>
            <div className='userPhoto'>
                <img src={props.profileData.photo} alt='' />
                <p>{props.profileData.name}</p>
            </div>
            <div className='postPhotos'>
                <p>{props.message}</p>
                <Slider {...settings}>{photos}</Slider>
            </div>
        </div>
    );
}

export default Post;
