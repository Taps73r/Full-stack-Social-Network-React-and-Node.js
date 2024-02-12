import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { loginFailure, loginPassText, loginRequest, loginSuccess, loginUserNameText } from '../../redux/login-reducer';
import axios from 'axios';
import Preloader from '../common/Preloader/Preloader';
import { setProfile } from '../../redux/profile-reducer';

class LoginContainer extends React.Component {
    handleLogin = async () => {
        const { username, password, loginRequest, loginSuccess, loginFailure, setProfile } = this.props;
        loginRequest();

        try {
            const response = await axios.post('http://localhost:3002/auth/login', { username, password });
            const token = response.data.token;
            const data = response.data;
            localStorage.setItem('token', token);
            loginSuccess(data);
            setProfile(data);


        } catch (error) {
            loginFailure(error.response.data.message || 'Помилка логіну');
        }
    };

    render() {
        if (this.props.isFetching) {
            return <Preloader />
        }
        else {
            return (
                <Login
                    username={this.props.username}
                    password={this.props.password}
                    error={this.props.error}
                    loginPassText={this.props.loginPassText}
                    loginUserNameText={this.props.loginUserNameText}
                    onLogin={this.handleLogin}
                />
            )
        }
    }
}

let mapStateToProps = (state) => ({
    username: state.loginInfo.username,
    password: state.loginInfo.password,
    isFetching: state.loginInfo.isFetching,
    isAuthenticated: state.loginInfo.isAuthenticated,
    error: state.loginInfo.error
})

let LoginContainerAPI = connect(mapStateToProps, {
    loginPassText,
    loginFailure,
    loginRequest,
    loginSuccess,
    loginUserNameText,
    setProfile
})(LoginContainer);
export default LoginContainerAPI;