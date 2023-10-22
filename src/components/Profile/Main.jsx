import './Main.css';
import CreatePostContainer from './Posts/CreatePostContainer';
import Post from './Posts/Post/Post';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Main(props) {
    let posts = props.profileInfo.postData.map(post => {
        return <Post message={post.postMessage} />
    })
    return (
        <div className="maincontent">
            <ProfileInfo />
            <CreatePostContainer dispatch={props.dispatch} />
            {posts}
        </div>
    )
}

export default Main;