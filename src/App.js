import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainerWithApi from './components/Profile/MainContainer';
import LoginContainerAPI from './components/Login/LoginContainer';
import RegisterContainerAPI from './components/Register/RegisterContainer';
import PreLogin from './components/Login/PreLogin';
import { connect } from 'react-redux';
import React from 'react';
import { loginSuccess } from './redux/login-reducer';

class App extends React.Component {
  componentDidMount() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // this.props.loginSuccess(storedToken);
      localStorage.removeItem('token');
    }
  }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="App">
        <Header />
        {isAuthenticated ? (
          <>
            <Sidebar />
            <div className='route_side_bar'>
              <Routes>
                <Route path="/profile/:userId" element={<ProfileContainerWithApi />} />
                <Route path="/profile/" element={<ProfileContainerWithApi />} />
                <Route path="/dialogs/*" element={<Dialogs />} />
                <Route path="/users/" element={<UsersContainer />} />
                <Route path="/news" element={<News />} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
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
          </>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.loginInfo.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (token) => dispatch(loginSuccess(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
