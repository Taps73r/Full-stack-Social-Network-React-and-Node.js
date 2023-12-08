import { connect } from "react-redux";
import { returnChangeUserInfo, updateChangeBioText, updateChangeNameText, uploadAvatar } from "../../redux/profile-reducer";
import './ProfileInfo/ProfileInfo.css';

let ChangeUserInfoComponent = (props) => {

    let submitData = (file) => {
        props.putChangedUserInfo(file);
        props.returnChangeUserInfo();
    }
    let returnChanging = () => {
        props.returnChangeUserInfo();
    }
    let newNameText = (e) => {
        const text = e.target.value;
        props.updateChangeNameText(text);
    }
    let newBioText = (e) => {
        const text = e.target.value;
        props.updateChangeBioText(text);
    }
    let handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result;
                props.uploadAvatar(base64Data);
            };
            reader.readAsDataURL(file);
        }
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target.querySelector('input[type="file"]').files[0];
        submitData(file);
    };
    return (
        <div className="change_info_form">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="header_and_return">
                    <h1>Change your info</h1>
                    <button onClick={returnChanging}>Return</button>
                </div>
                <div className="name_bio">
                    <p>Name</p>
                    <input
                        type="text"
                        id="username"
                        value={props.changeNameText}
                        onChange={newNameText}
                        placeholder="Enter your nickname here..."
                    />
                    <p>Bio</p>
                    <textarea
                        placeholder="Enter your biography here..."
                        type="text"
                        id="bio"
                        value={props.changeBioText}
                        onChange={newBioText}
                    />
                </div>
                <p>Avatar</p>
                <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    onChange={handleFileChange}
                />
                <button type="submit" >Save</button>
            </form>
        </div>
    )
}
let mapStateToProps = (state) => {
    return {
        changeBioText: state.profileInfo.changeBioText,
        changeNameText: state.profileInfo.changeNameText
    }
}

let ChangeUserInfo = connect(mapStateToProps, {
    returnChangeUserInfo,
    updateChangeNameText,
    updateChangeBioText,
    uploadAvatar
})(ChangeUserInfoComponent)
export default ChangeUserInfo;
