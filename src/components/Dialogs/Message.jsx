import React from "react";
import TextData from "./Messages/Messages";
import Users from "./Users/User";

function Message(props) {
    return (
                <div className="dialog">
                    <Users usersData={props.messageInfo.usersData} />
                    <TextData messagesData={props.messageInfo.messagesData} />
                </div>
    );
}

export default Message;