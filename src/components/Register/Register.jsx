import './Register.css';
import React from 'react';

let Registration = (props) => {

const submitRegister = () =>{
  props.onRegistration();
}

const updatePassText = (e) =>{
  const text = e.target.value;
  props.registerPassText(text);
}

const updateUserText = (e) =>{
  const text = e.target.value;
  props.registerUsnameText(text);
}

  return (
    <div className='register_form'>
      <h2>Реєстрація</h2>
      <div>
        <label>Ім'я користувача:</label>
        <input type="text" value={props.username} onChange={updateUserText}/>
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password" value={props.password} onChange={updatePassText}/>
      </div>
      <button onClick={submitRegister}>Зареєструватися</button>
    </div>
  );
};

export default Registration;