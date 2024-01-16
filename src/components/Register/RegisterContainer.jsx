import React from 'react';
import Preloader from './../common/Preloader/Preloader';
import Registration from './Register';
import { connect } from 'react-redux';
import { registerFailure, registerRequest, registerSuccess, registerUpdatePassText, registerUpdateUsernameText } from '../../redux/register-reducer';
import axios from 'axios';
import SuccessComponent from './SuccesComponent';
import './Register.css';
class RegisterContainer extends React.Component {

    handleRegistration = () => {
        this.props.registerRequest();

        const username = this.props.username;
        const password = this.props.password;

        axios.post('http://localhost:3002/auth/register', { username, password })
            .then((response) => {
                this.props.registerSuccess();
                // Виконайте додаткові дії для успішної реєстрації
            })
            .catch((error) => {
                this.props.registerFailure(error);
                // Виконайте додаткові дії для обробки помилки реєстрації
            });
    }
    render() {
        if (this.props.isLoading) {
            return <Preloader />
        } else if (this.props.success) {
            return <SuccessComponent />
        } else {
            return (
                <Registration
                    username={this.props.username}
                    password={this.props.password}
                    onRegistration={this.handleRegistration}
                    registerPassText={this.props.registerUpdatePassText}
                    registerUsnameText={this.props.registerUpdateUsernameText}
                    error={this.props.error}
                />
            );
        }
    }
}

let mapStateToProps = (state) => ({
    isLoading: state.registerInfo.isLoading,
    success: state.registerInfo.success,
    error: state.registerInfo.error,
    username: state.registerInfo.username,
    password: state.registerInfo.password
})

let RegisterContainerAPI = connect(mapStateToProps, {
    registerRequest, registerFailure, registerSuccess, registerUpdatePassText, registerUpdateUsernameText
})(RegisterContainer);

export default RegisterContainerAPI;
