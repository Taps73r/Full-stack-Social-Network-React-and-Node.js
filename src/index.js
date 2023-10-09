import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let messagesData = [{ id: 1, message: 'fsdaafadfad' }, { id: 2, message: '211241212fe' }];
let usersData = [{ id: 1, name: 'Sasha' }, { id: 2, name: 'Misha' }];
let postData = [{id: 1, postMessage: 'dsadads'}, {id: 2, postMessage: 'dsad1231243ads'}]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App messagesData={messagesData} usersData={usersData} postData={postData}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
