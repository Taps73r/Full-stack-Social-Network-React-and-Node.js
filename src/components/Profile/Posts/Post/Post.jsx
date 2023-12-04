import React from 'react';
import './Post.css';

function Post(props) {
    const photos = props.photos.map((photo, index) => (
        <img key={index} src={photo} alt={`Post ${index + 1}`} />
    ));

    return (
        <div className='posts'>
            <p>{props.message}</p>
            {photos}
        </div>
    );
}

export default Post;
