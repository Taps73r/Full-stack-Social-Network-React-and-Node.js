import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import {
  loginPassText,
  loginRequest,
  loginSuccess,
  loginUserNameText,
} from "../../redux/login-reducer";
import axios from "axios";
import { setProfile } from "../../redux/profile-reducer";
import { setErrorMessage } from "../../redux/error-reducer";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";

class LoginContainer extends React.Component {
  handleLogin = async () => {
    const {
      username,
      password,
      loginRequest,
      loginSuccess,
      setProfile,
      setErrorMessage,
    } = this.props;
    loginRequest();

    try {
      const response = await axios.post("http://localhost:3002/auth/login", {
        username,
        password,
      });
      const token = response.data.token;
      const data = response.data;
      localStorage.setItem("token", token);
      loginSuccess(data);
      setProfile(data);
      window.location.replace("/profile");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message || "Помилка логіну");
    }
  };

  render() {
    return (
      <>
        {this.props.errorMessage ? <ErrorCatcherContainer /> : <></>}
        <Login
          username={this.props.username}
          password={this.props.password}
          error={this.props.error}
          loginPassText={this.props.loginPassText}
          loginUserNameText={this.props.loginUserNameText}
          onLogin={this.handleLogin}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  username: state.loginInfo.username,
  password: state.loginInfo.password,
  isFetching: state.loginInfo.isFetching,
  isAuthenticated: state.loginInfo.isAuthenticated,
  errorMessage: state.errorInfo.errorMessage,
});

let LoginContainerAPI = connect(mapStateToProps, {
  loginPassText,
  loginRequest,
  loginSuccess,
  loginUserNameText,
  setProfile,
  setErrorMessage,
})(LoginContainer);
export default LoginContainerAPI;
