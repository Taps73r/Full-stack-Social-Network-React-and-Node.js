import { connect } from "react-redux"
import {  returnChangeUserInfo, updateChangeBioText, updateChangeNameText } from "../../redux/profile-reducer"

let ChangeUserInfoComponent = (props) => {
    let submitData = () => {
        props.putChangedUserInfo();
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
    return (
        <div className="change_info_form">
            <div className="header_and_return">
                <h1>Edit user info</h1>
                <button onClick={returnChanging}>Return</button>
            </div>
            <p>Name</p>
            <input
                type="text"
                id="username"
                value={props.changeNameText}
                onChange={newNameText}
            />
            <p>Bio</p>
            <input
                type="text"
                id="bio"
                value={props.changeBioText}
                onChange={newBioText}
            />
            <button onClick={submitData} >Save</button>
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
    updateChangeBioText
})(ChangeUserInfoComponent)
export default ChangeUserInfo;

