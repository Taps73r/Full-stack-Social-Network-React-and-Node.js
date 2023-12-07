import ChangeUserInfo from './ChangeUserInfo';
import './Main.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Main(props) {
    if (props.changingInfo === true) {
        return (
            <ChangeUserInfo putChangedUserInfo={props.putChangedUserInfo}/>
        )
    }
    else {
        return (
            <div className="maincontent">
                <ProfileInfo
                    postData={props.postData}
                    profileData={props.profileData}
                    changeUserInfo={props.changeUserInfo}
                    addPost={props.addPost} />
            </div>
        )
    }
}

export default Main;