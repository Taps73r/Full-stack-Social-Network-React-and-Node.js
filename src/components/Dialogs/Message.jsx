import SendMessage from "./Messages/SendMessage";
import TextData from "./Messages/Messages";
import Users from "./Users/User";

function Message(props) {
    return (
        <div className="dialog">
            <Users usersData={props.usersData} />
            <TextData messagesData={props.messagesData} />
            <SendMessage dispatch={props.dispatch}/>
        </div>
    )
}
export default Message;