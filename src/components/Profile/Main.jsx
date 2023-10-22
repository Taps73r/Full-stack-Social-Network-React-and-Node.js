import './Main.css';
import CreatePostContainer from './Posts/CreatePostContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Main() {
    return (
        <div className="maincontent">
            <ProfileInfo />
            <CreatePostContainer/>
        </div>
    )
}

export default Main;