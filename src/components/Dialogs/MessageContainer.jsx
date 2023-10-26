
import Message from "./Message";
import { connect } from "react-redux";

let mapMessageInfoToProps = (state) =>{
    return{
        messageInfo: state.messageInfo
    }
}
const MessageContainer = connect(mapMessageInfoToProps)(Message);
export default MessageContainer;