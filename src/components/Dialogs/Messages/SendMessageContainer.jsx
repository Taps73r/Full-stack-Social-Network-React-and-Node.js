import React from "react";
import SendMessage from "./SendMessage"
import { addMessage, updateTextMessage } from "./../../../redux/dialog-reducer";
import ContextStore from "../../../redux/store-context";

function SendMessageContainer() {
    return (
        <ContextStore.Consumer>
            {
                (store) => {
                    const addText = () => {
                        store.dispatch(addMessage());
                    }

                    const updateText = (text) => {
                        store.dispatch(updateTextMessage(text));
                    }
                    return (
                        <SendMessage addNewText={addText} updateNewText={updateText} />
                    )
                }
            }
        </ContextStore.Consumer>
    )
}

export default SendMessageContainer;