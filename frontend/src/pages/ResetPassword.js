import React, { useState } from 'react';
import '../styles/resetpw.css';
import '../styles/styles.css';
import Swal from 'sweetalert2'

const ResetPW = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const successAlert = () => {
    Swal.fire({
      title: 'Reset Password',
      text: "Success! Please return to login page.",
      type: 'success',
      
    })
  }
  const errorAlert = () => {
    Swal.fire({
      title: 'Reset Password',
      text: "Opps! Please make sure that you fill in your email and new password.",
      type: 'error',
      
    })
  }

  const handelSubmit = (e) => {

    e.preventDefault();
    const data = {
      email,
      password
    }
    fetch(`http://localhost:4000/api/changePWbyID`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }) 
    .then((response) => {
      console.log(response)
      // if(response.ok) {
      //   console.log('Password successfully changed to:', password ,'for', email)
      // }
    })
    
      if(email.length && password.length !== 0) {
        successAlert(e)
      } else {
        errorAlert(e)
      }
    
    console.log('email: ', email)
    console.log('password: ', password)
  }

  return (
    <div className='row resetPWPage'>
      <div className='resetPWContainer col-12'>
        <div className='card offset-4 p-4 px-6'>
          <h2>Forgot Your Password?</h2>
          <p>
            Please fill in your email and your new password.
          </p>
          <form onSubmit={handelSubmit}>

            <h6 className='m-0'>Email</h6>                                {/* Email title and input */}

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

            <h6 className='m-0'>New Password</h6>                         {/* Password title and input */}

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
            {
              email && password === null && (
                errorAlert()
              )
            }
            <button type='submit' className='btn-danger mt-2 u-pull-right'>Reset Password</button>
          </form>
          <div className='mt-3'>
            <a href='http://localhost:3000' className='u u-LR text-white'>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );


};

export default ResetPW;