import './Register.css';
import React from 'react';

const Registration = (props) => {
  return (
    <div className='register_form'>
      <h2>Реєстрація</h2>
      <div>
        <label>Ім'я користувача:</label>
        <input type="text" />
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password"/>
      </div>
      <button >Зареєструватися</button>
    </div>
  );
};

export default Registration;