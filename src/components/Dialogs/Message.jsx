
import TextData from "./Messages/Messages";
import Users from "./Users/User";

function Message(props) {
    return (
        <div className="dialog">
            <Users usersData={props.usersData} />
            <TextData messagesData={props.messagesData} />
        </div>
    )
}
export default Message;