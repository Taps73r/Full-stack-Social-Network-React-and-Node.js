import React from "react";
import SendMessage from "./SendMessage"
import { addMessage, updateTextMessage } from "./../../../redux/dialog-reducer";

function SendMessageContainer(props) {

    const addText = () => {
        props.dispatch(addMessage());
    }

    const updateText = (text) => {
        props.dispatch(updateTextMessage(text));
    }
    return (
        <SendMessage addNewText={addText} updateNewText={updateText} />
    )
}

export default SendMessageContainer;