import './Settings.css';

let Settings = (props) => {
    let leaveSession = () => {
        localStorage.removeItem('token');
        props.resetData();
        window.location.href = '/login';
    }
    return(
        <div className="settings">
            <div className="settings_element">
                <div className="settings_content">
                    <h1>Settings</h1>
                    <button onClick={leaveSession}>Leave</button>
                </div>
            </div>
        </div>
    )
}

export default Settings;