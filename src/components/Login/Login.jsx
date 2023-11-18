import './Login.css';
let Login = (props) => {
    const submitLogin = () => {
        props.onLogin();
    }

    const updatePassText = (e) => {
        const text = e.target.value;
        props.loginPassText(text);
    }

    const updateUserText = (e) => {
        const text = e.target.value;
        props.loginUserNameText(text);
    }
    return (
        <div className="login-form">
            <form>
                <div className="form-group">
                    <h2>Login</h2>
                    <p htmlFor="username">Username:</p>
                    <input
                        type="text"
                        id="username"
                        value={props.username}
                        onChange={updateUserText}
                    />
                </div>
                <div className="form-group">
                    <p htmlFor="password">Password:</p>
                    <input
                        type="password"
                        id="password"
                        value={props.password}
                        onChange={updatePassText}
                    />
                    <div className='center-button'>
                        <button className='form-button' type="button" onClick={submitLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;