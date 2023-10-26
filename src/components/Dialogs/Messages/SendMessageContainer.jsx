import { addMessage, updateTextMessage } from "../../../redux/dialog-reducer";
import SendMessage from "./SendMessage"
import { connect } from 'react-redux';

let mapDispatchMessageToProps = (dispatch) => {
    return {
        updateNewText: (text) => {
            dispatch(updateTextMessage(text))
        },
        addNewText: () => {
            dispatch(addMessage())
        }
    }
}
let mapNewPostTextToProps = (state) => {
    return {
        newMessageText: state.messageInfo.newMessageText
    }
}
const SendMessageContainer = connect(mapNewPostTextToProps, mapDispatchMessageToProps)(SendMessage);
export default SendMessageContainer;