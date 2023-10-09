import './Dialogs.css';
import Message from './Message'

function Dialogs(props) {
    return (
        <div className="dialogs">
            <Message messagesData={props.messagesData} usersData={props.usersData} />
        </div>
    )
}

export default Dialogs;