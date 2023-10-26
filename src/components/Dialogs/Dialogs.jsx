import './Dialogs.css';
import MessageContainer from './MessageContainer'
import SendMessageContainer from './Messages/SendMessageContainer';

function Dialogs() {
    return (
        <div className="dialogs">
            <MessageContainer />
            <SendMessageContainer />
        </div>
    )
}

export default Dialogs;