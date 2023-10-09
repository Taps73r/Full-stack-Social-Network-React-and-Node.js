let messagesData = [{ id: 1, message: 'fsdaafadfad' }, { id: 2, message: '211241212fe' }];

let messages = messagesData.map(m => {
    return (<Text message={m.message} />)
})

function Text(props) {
    return (
        <div className="text">
            <div className="dialog_text">
                {props.message}
            </div>
        </div>
    )
}

function TextData(props) {
    
    return (
        <div className="dialog_content">
            {messages}
        </div>
    )
}
export default TextData;