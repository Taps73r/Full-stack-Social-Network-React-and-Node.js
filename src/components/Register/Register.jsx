import './Register.css';
import React from 'react';

let Registration = (props) => {

  const submitRegister = () => {
    props.onRegistration();
  }

  const updatePassText = (e) => {
    const text = e.target.value;
    props.registerPassText(text);
  }

  const updateUserText = (e) => {
    const text = e.target.value;
    props.registerUsnameText(text);
  }

  return (
    <div className='register_form'>
      <h2>Registration</h2>
      <div>
        <p>Username:</p>
        <input type="text" value={props.username} onChange={updateUserText} />
      </div>
      <div>
        <p>Password:</p>
        <input type="password" value={props.password} onChange={updatePassText} />
      </div>
      <div className='btn-position'>
        <button onClick={submitRegister}>Submit</button>
      </div>
    </div>
  );
};

export default Registration;