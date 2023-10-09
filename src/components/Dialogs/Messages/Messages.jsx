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
    let messages = props.messagesData.map(m => {
        return (<Text message={m.message} />)
    })

    return (
        <div className="dialog_content">
            {messages}
        </div>
    )
}
export default TextData;