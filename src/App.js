import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

