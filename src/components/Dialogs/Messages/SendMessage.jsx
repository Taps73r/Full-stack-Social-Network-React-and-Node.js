import React from "react";
import { addMessage, updateTextMessage } from "./../../../redux/dialog-reducer";

function SendMessage(props) {


    const addText = () => {
        props.dispatch(addMessage());
    }

    const updateText = (e) => {
        const text = e.target.value;
        props.dispatch(updateTextMessage(text));
    }
    return (
        <div className="send_message">
            <textarea onChange={updateText} value={props.newMessageText} />
            <button onClick={addText}>Send</button>
        </div>
    )
}

export default SendMessage;