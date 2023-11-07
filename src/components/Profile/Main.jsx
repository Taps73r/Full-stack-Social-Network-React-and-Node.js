import './Main.css';
import CreatePostContainer from './Posts/CreatePostContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Main(props) {
    return (
        <div className="maincontent">
            <ProfileInfo postData={props.postData} profileData={props.profileData}/>
            <CreatePostContainer/>
        </div>
    )
}

export default Main;