import './Main.css';
import CreatePost from './Posts/CreatePost';
import Post from './Posts/Post/Post';
import ProfileInfo from './ProfileInfo/ProfileInfo';

let postData = [{id: 1, postMessage: 'dsadads'}, {id: 2, postMessage: 'dsadads'}]

let posts = postData.map(post => {
    return <Post message={post.postMessage} />
})

function Main() {
    return (
        <div className="maincontent">
            <ProfileInfo />
            <CreatePost />
            {posts}
        </div>
    )
}

export default Main;