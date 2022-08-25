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
            Please fill in your email and your new password.
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
                  placeholder='New Password'
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
          <div className='mt-3'>
            <a href='http://localhost:3000' className='u u-LR text-white'>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
 

}

// WITH KILLME as (
// 	SELECT public."user".user_id as user_id, public."user".email, public."account".user_id as account_id , public."account".password_hash
// 	FROM public."user"
// 	INNER JOIN public."account"
// 	ON public."user".user_id = public."account".user_id
// )

// SELECT user_id, account_id, email, password_hash FROM KILLME;
// -- UPDATE account SET password_hash = '24846z2015' WHERE email = 'guanxi.20@ichat.sp.edu.sg'

// UPDATE account SET password_hash = 'helpME' WHERE user_id = 37



export default ResetPW;