import ErrorCatcher from "../common/ErrorCatcher/ErrorCatcher";
import ChangeUserInfo from "./ChangeUserInfo";
import "./Main.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Main(props) {
  if (props.changingInfo === true) {
    return <ChangeUserInfo putChangedUserInfo={props.putChangedUserInfo} />;
  } else {
    return (
      <div className="maincontent">
        <ErrorCatcher />
        <ProfileInfo
          postData={props.postData}
          profileData={props.profileData}
          changeUserInfo={props.changeUserInfo}
          addPost={props.addPost}
          userId={props.userId}
          likeCurrentPost={props.likeCurrentPost}
          updatePostText={props.updatePostText}
          updateTextPost={props.updateTextPost}
          deleteCurrentPost={props.deleteCurrentPost}
          updateCurrentPost={props.updateCurrentPost}
        />
      </div>
    );
  }
}

export default Main;
