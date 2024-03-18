import React from "react";
import Registration from "./Register";
import { connect } from "react-redux";
import {
  registerRequest,
  registerSuccess,
  registerUpdatePassText,
  registerUpdateUsernameText,
} from "../../redux/register-reducer";
import axios from "axios";
import SuccessComponent from "./SuccesComponent";
import "./Register.css";
import { setErrorMessage } from "../../redux/error-reducer";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";
class RegisterContainer extends React.Component {
  handleRegistration = () => {
    this.props.registerRequest();

    const username = this.props.username;
    const password = this.props.password;

    axios
      .post("https://converso-social-network-api.onrender.com/auth/register", {
        username,
        password,
      })
      .then((response) => {
        this.props.registerSuccess();
      })
      .catch((error) => {
        this.props.setErrorMessage(error.response.data.message);
      });
  };
  render() {
    if (this.props.success) {
      return <SuccessComponent />;
    } else {
      return (
        <>
          {this.props.errorMessage ? <ErrorCatcherContainer /> : <></>}
          <Registration
            username={this.props.username}
            password={this.props.password}
            onRegistration={this.handleRegistration}
            registerPassText={this.props.registerUpdatePassText}
            registerUsnameText={this.props.registerUpdateUsernameText}
            error={this.props.error}
          />
        </>
      );
    }
  }
}

let mapStateToProps = (state) => ({
  isLoading: state.registerInfo.isLoading,
  success: state.registerInfo.success,
  error: state.registerInfo.error,
  username: state.registerInfo.username,
  password: state.registerInfo.password,
  errorMessage: state.errorInfo.errorMessage,
});

let RegisterContainerAPI = connect(mapStateToProps, {
  registerRequest,
  registerSuccess,
  registerUpdatePassText,
  registerUpdateUsernameText,
  setErrorMessage,
})(RegisterContainer);

export default RegisterContainerAPI;
