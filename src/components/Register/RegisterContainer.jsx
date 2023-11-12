import React from 'react';
import Registration from './Register';
import { connect } from 'react-redux';
class RegisterContainer extends React.Component{
    componentDidMount(){

    }
    render(){
        return(
            <Registration />
        )
    }
}

let mapStateToProps
let RegisterContainerAPI = connect(mapStateToProps, {

})(RegisterContainer);

export default RegisterContainerAPI;
