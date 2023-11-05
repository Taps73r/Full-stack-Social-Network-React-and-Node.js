import { addMessage, updateTextMessage } from "../../../redux/dialog-reducer";
import SendMessage from "./SendMessage"
import { connect } from 'react-redux';

let mapNewPostTextToProps = (state) => {
    return {
        newMessageText: state.messageInfo.newMessageText
    }
}
const SendMessageContainer = connect(mapNewPostTextToProps, {
    updateNewText: updateTextMessage,
    addNewText: addMessage

})(SendMessage);
export default SendMessageContainer;