import './Post.css';

function Post (props){
    return (
        <div className='posts'>
        { props.message }
        </div>
    )
}

export default Post;