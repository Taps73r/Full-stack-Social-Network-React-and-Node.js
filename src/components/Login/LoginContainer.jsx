import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { loginFailure, loginPassText, loginRequest, loginSuccess, loginUserNameText } from '../../redux/login-reducer';

class LoginContainer extends React.Component {


    render() {
        return (
            <Login 
            username={this.props.username}
            password={this.props.password}
            error={this.props.error}
            loginPassText={this.props.loginPassText}
            loginUserNameText={this.props.loginUserNameText}
            />
        )
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
    loginUserNameText
})(LoginContainer);
export default LoginContainerAPI;