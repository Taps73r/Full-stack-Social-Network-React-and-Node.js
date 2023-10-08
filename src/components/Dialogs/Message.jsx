import { NavLink } from "react-router-dom";

function MessageUser(props) {
    let path = '/dialogs/' + props.id;
    return (
        <div className="messageitem">
            <div className="dialog_avatar">
                <img src={props.urlavarat} alt="avatar" />
            </div>
            <NavLink to={path}>
                {props.name}
            </NavLink>
        </div>
    )
}

function Text(props) {
    return (
        <div className="text">
            <div className="dialog_text">
                {props.message}
            </div>
        </div>
    )
}
function Message(props) {
    return (
            <div className="dialog">
                <div className="user_dialog">
                    <MessageUser name="Sasha" id="1" urlavarat="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" />
                    <MessageUser name="Misha" id="2" urlavarat="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" />
            </div>
            <div className="dialog_content">
                <Text message="LOlololol" />
            </div>
        </div>
    )
}
export default Message;