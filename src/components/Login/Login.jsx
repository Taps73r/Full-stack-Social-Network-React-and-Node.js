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
            <h2>Увійти</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Ім'я користувача:</label>
                    <input
                        type="text"
                        id="username"
                        value={props.username}
                        onChange={updateUserText}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={props.password}
                        onChange={updatePassText}
                    />
                </div>
                <button type="button" onClick={submitLogin}>
                    Увійти
                </button>
            </form>
        </div>
    );
}

export default Login;