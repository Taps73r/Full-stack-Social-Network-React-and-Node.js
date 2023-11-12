import React from "react";
import { setIsFetching, setUserData } from "../../redux/auth-reducer";
import Header from "./Header";
import { connect } from "react-redux";


class HeaderContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <Header />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isFetching: state.authInfo.isFetching,
        email: state.authInfo.email,
        login: state.authInfo.login,
        id: state.authInfo.id
    }
}

let HeaderAuthUserWithApiContainer = connect(mapStateToProps, {
    setIsFetching,
    setUserData
})(HeaderContainer)
export default HeaderAuthUserWithApiContainer;