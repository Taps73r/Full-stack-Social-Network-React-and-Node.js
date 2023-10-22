import SendMessageContainer from "./Messages/SendMessageContainer";
import TextData from "./Messages/Messages";
import Users from "./Users/User";

function Message(props) {
    return (
        <div className="dialog">
            <Users usersData={props.usersData} />
            <TextData messagesData={props.messagesData} />
            <SendMessageContainer dispatch={props.dispatch}/>
        </div>
    )
}
export default Message;