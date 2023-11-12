import './Login.css';
let Login = (props) => {
    return (
        <div className="login-form">
            <h2>Увійти</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Ім'я користувача:</label>
                    <input
                        type="text"
                        id="username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                    />
                </div>
                <button type="button">
                    Увійти
                </button>
            </form>
        </div>
    );
}

export default Login;