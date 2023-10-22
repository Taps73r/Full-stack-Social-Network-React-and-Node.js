import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextStore from './redux/store-context';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
function reRenderTree(state) {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
      <ContextStore.Provider value={store}>
        <App />
        </ContextStore.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
reRenderTree(store.getState());
store.subscribe(() =>{
  let state = store.getState();
  reRenderTree(state);
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
