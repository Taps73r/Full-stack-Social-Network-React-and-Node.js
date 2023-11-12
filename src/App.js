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
function App() {
  return (
    <div className="App">
      <Header />
      <PreLogin />
      <Routes>
        <Route path="/login" element={<LoginContainerAPI />} />
        <Route path="/registration" element={<RegisterContainerAPI />} />
      </Routes>
      <Footer />
      {/* <HeaderAuthUserWithApiContainer />
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
       */}
    </div>
  );
}

export default App;

