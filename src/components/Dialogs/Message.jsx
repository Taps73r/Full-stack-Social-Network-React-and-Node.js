import React from "react";
import SendMessageContainer from "./Messages/SendMessageContainer";
import TextData from "./Messages/Messages";
import Users from "./Users/User";
import ContextStore from "../../redux/store-context";

function Message() {
    return (
        <ContextStore.Consumer>
            {store => (
                <div className="dialog">
                    <Users usersData={store.getState().messageInfo.usersData} />
                    <TextData messagesData={store.getState().messageInfo.messagesData} />
                    <SendMessageContainer />
                </div>
            )}
        </ContextStore.Consumer>
    );
}

export default Message;