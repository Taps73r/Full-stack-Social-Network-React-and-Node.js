import './Main.css';
import CreatePost from './Posts/CreatePost';
import Post from './Posts/Post/Post';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Main(props) {
    let posts = props.postData.map(post => {
        return <Post message={post.postMessage} />
    })
    return (
        <div className="maincontent">
            <ProfileInfo />
            <CreatePost newPostText={props.newPostText} 
            addPost={props.addPost} updateTextPost={props.updateTextPost}/>
            {posts}
        </div>
    )
}

export default Main;