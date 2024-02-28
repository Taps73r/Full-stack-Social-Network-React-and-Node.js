import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainerWithApi from "./components/Profile/MainContainer";
import LoginContainerAPI from "./components/Login/LoginContainer";
import RegisterContainerAPI from "./components/Register/RegisterContainer";
import PreLogin from "./components/Login/PreLogin";
import { connect } from "react-redux";
import React from "react";
import { loginSuccess } from "./redux/login-reducer";
import axios from "axios";
import SettingsContainer from "./components/Settings/SettingsContainer";
import OtherProfileContainerWithApi from "./components/OtherProfile/OtherProfileContainer";
import NewsContainerWithRedux from "./components/News/NewsContainer";
import ChatContainer from "./components/Chat/ChatContainer";
import { setErrorMessage } from "./redux/error-reducer";
import ErrorCatcherContainer from "./components/common/ErrorCatcher/ErrorCatcher";

class App extends React.Component {
  componentDidMount() {
    this.fetchToken();
  }

  fetchToken() {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios
        .post("http://localhost:3002/protected", {})
        .then((response) => {
          const { token, username, userId } = response.data;
          this.props.loginSuccess({ token, username, userId });
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message, error.response.status);
        });
    }
  }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="App">
        {this.props.errorMessage ? <ErrorCatcherContainer /> : <></>}
        <Header />
        {isAuthenticated ? (
          <>
            <Sidebar />
            <div className="route_side_bar">
              <Routes>
                <Route
                  path="/profile/:userId"
                  element={<ProfileContainerWithApi />}
                />
                <Route path="/profile/" element={<ProfileContainerWithApi />} />
                <Route path="/dialogs/*" element={<ChatContainer />} />
                <Route path="/users/" element={<UsersContainer />} />
                <Route path="/news" element={<NewsContainerWithRedux />} />
                <Route path="/settings" element={<SettingsContainer />} />
                <Route
                  path="/user-profile/:userId"
                  element={<OtherProfileContainerWithApi />}
                />
              </Routes>
            </div>
          </>
        ) : (
          <>
            <PreLogin />
            <Routes>
              <Route path="/login" element={<LoginContainerAPI />} />
              <Route path="/registration" element={<RegisterContainerAPI />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.loginInfo.isAuthenticated,
  errorMessage: state.errorInfo.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (token) => dispatch(loginSuccess(token)),
  setErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
