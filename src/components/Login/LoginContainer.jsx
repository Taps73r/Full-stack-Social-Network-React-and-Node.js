import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';

class LoginContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <Login />
        )
    }
}

let mapStateToProps
let LoginContainerAPI = connect(mapStateToProps, {

})(LoginContainer);
export default LoginContainerAPI;