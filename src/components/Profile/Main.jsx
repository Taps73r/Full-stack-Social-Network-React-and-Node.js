import './Main.css';
import CreatePostContainer from './Posts/CreatePostContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Main(props) {
    debugger;
    return (
        <div className="maincontent">
            <ProfileInfo postData={props.postData}/>
            <CreatePostContainer/>
        </div>
    )
}

export default Main;