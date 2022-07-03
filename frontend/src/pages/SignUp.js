import { useState } from 'react';
import '../styles/login.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  // Reading form inputs
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { firstName, lastName, email, contact, password };

    console.log(postData);
  };

  return (
    <div className='row loginPage'>
      <div className='loginContainer col-12'>
        <div className='card offset-4 p-4 px-6'>
          <h2>Welcome Back to FIRC!</h2>
          <p>
            Please fill in your relevant details to sign up for a new account
            with FIRC!
          </p>
          <form onSubmit={handleSubmit}>
            <div className='row level'>
              <div className='col-6'>
                <div className='input-control w-100p'>
                  <input
                    type='text'
                    className='input-contains-icon'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <span className='icon'>
                    <i className='fas fa-user'></i>
                  </span>
                </div>
              </div>
              <div className='col-6'>
                <div className='input-control w-100p'>
                  <input
                    type='text'
                    className='input-contains-icon'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <span className='icon'>
                    <i className='fas fa-user'></i>
                  </span>
                </div>
              </div>
            </div>
            <div className='row level'>
              <div className='col-6'>
                <div className='input-control w-100p'>
                  <input
                    type='email'
                    className='input-contains-icon'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className='icon'>
                    <i className='fas fa-envelope'></i>
                  </span>
                </div>
              </div>
              <div className='col-6'>
                <div className='input-control w-100p'>
                  <input
                    type='tel'
                    className='input-contains-icon'
                    placeholder='Contact'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                  <span className='icon'>
                    <i className='fas fa-phone'></i>
                  </span>
                </div>
              </div>
            </div>
            <div className='row level px-1'>
              <div className='input-control w-100p'>
                <input
                  type='password'
                  className='input-contains-icon'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className='icon'>
                  <i className='fas fa-key'></i>
                </span>
              </div>
            </div>
            <button className='btn-danger mt-2 mr-1 u-pull-right'>
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
