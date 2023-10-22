import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Profile/Main';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
function App(props) {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <div className='route_side_bar'>
        <Routes>
          <Route path="/profile" element={<Main store={props.store} profileInfo={props.state.profileInfo} dispatch={props.dispatch} />} />
          <Route path="/dialogs/*" element={<Dialogs messagesData={props.state.messageInfo.messagesData} dispatch={props.dispatch} usersData={props.state.messageInfo.usersData} />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

