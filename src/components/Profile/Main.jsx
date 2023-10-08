import './Main.css';
import Profile from './Posts/Profile';
import Post from './Posts/Post/Post';
import ProfileInfo from './ProfileInfo/ProfileInfo';
function Main() {
    return (
        <div className="maincontent">
            <ProfileInfo />
            <Profile />
            <Post message="New content"/>
        </div>
    )
}

export default Main;