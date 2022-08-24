import React, { useState, useEffect } from 'react';
import '../styles/resetpw.css';
import '../styles/styles.css';

const ResetPW = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='row resetPWPage'>
      <div className='resetPWContainer col-12'>
        <div className='card offset-4 p-4 px-6'>
          <h2>Forgot Your Password?</h2>
          <p>
            Please fill in the email you use to sign in and your new password
          </p>
          <form>
            <h6 className='m-0'>Email</h6>
            <div className='row level'>
              <div className='input-control w-100p'>
                <input
                  type='email'
                  className='input-contains-icon'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className='icon'>
                  <i className='fas fa-user'></i>
                </span>
              </div>
            </div>
            <h6 className='m-0'>New Password</h6>
            <div className='row level'>
              <div className='input-control w-100p'>
                <input
                  type='password'
                  className='input-contains-icon'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className='icon'>
                  <i className='fas fa-key'></i>
                </span>
              </div>
            </div>
            <button className='btn-danger mt-2 u-pull-right'>Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  )
 

}
 
export default ResetPW;