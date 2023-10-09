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

function Users(props) {
    let user = props.usersData.map(dialog => {
        return <MessageUser name={dialog.name} id={dialog.id}
            urlavarat='https://variety.com/wp-content/uploads/2021/04/Avatar.jpg' />
    })
    return (
        <div className="user_dialog">
            {user}
        </div>
    )
}

export default Users;