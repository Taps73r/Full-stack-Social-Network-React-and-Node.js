import './Post.css';

function Post (props){
    return (
        <div className='posts'>1 post
        { props.message }
        </div>
    )
}

export default Post;