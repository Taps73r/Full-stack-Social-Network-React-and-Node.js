import React from "react";

function SendMessage(props) {

    const addText = () => {
        props.addNewText();
    }

    const updateText = (e) => {
        const text = e.target.value;
        props.updateNewText(text);
    }
    return (
        <div className="send_message">
            <textarea onChange={updateText} value={props.newMessageText} />
            <button onClick={addText}>Send</button>
        </div>
    )
}

export default SendMessage;