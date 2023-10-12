import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { addPost, updateTextPost} from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
export function reRenderTree(state) {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state} addPost={addPost} updateTextPost={updateTextPost}/>
      </BrowserRouter>
    </React.StrictMode>
  );
}
