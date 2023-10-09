
import TextData from "./Messages/Messages";
import Users from "./Users/User";

function Message(props) {
    return (
        <div className="dialog">
            <Users />
            <TextData />
        </div>
    )
}
export default Message;