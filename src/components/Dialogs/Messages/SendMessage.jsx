import React from "react";
import { addMessage, updateTextMessage } from "./../../../redux/state";

function SendMessage(props) {

    const newMessageElement = React.createRef();

    const addText = () => {
        props.dispatch(addMessage());
    }

    const updateText = () => {
        const text = newMessageElement.current.value;
        props.dispatch(updateTextMessage(text));
    }
    return (
        <div className="send_message">
            <textarea ref={newMessageElement} onChange={updateText} value={props.newMessageText} />
            <button onClick={addText}>Send</button>
        </div>
    )
}

export default SendMessage;