import '../styles/login.css';
import '../styles/styles.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user') || auth) {
      navigate('/equipmentUtilisationSnapshot');
    }
  }, [auth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    // console.log(data);

    fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => {
      // checks if response status was 200-299
      if (response.ok) {
        response.json().then((result) => {
          console.log(result);
          const accessToken = result?.token;
          setAuth({ email, accessToken });
          console.log('Successful login, redirect to EUS');
          navigate('/equipmentUtilisationSnapshot', { replace: true });
          localStorage.setItem('user', email);
          localStorage.setItem('role', result?.role);
        });
      } else {
        console.log(response);
        if (!response?.status) {
          alert('No server response');
        } else if (response?.status === 400) {
          alert('Missing username or password');
        } else if (response?.status === 401) {
          alert('Wrong email or password');
        } else {
          alert('Login failed!');
        }
      }
    });
  };

  return (
    <div className='row loginPage'>
      <div className='loginContainer col-12'>
        <div className='card offset-4 p-4 px-6'>
          <h2>Welcome Back to FIRC!</h2>
          <p>
            Please fill in your relevant details before logging on to see the
            dashboard!
          </p>
          <form onSubmit={handleSubmit}>
            <h6 className='m-0'>Username</h6>
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
            <h6 className='m-0'>Password</h6>
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
            <button className='btn-danger mt-2 u-pull-right'>SIGN IN</button>
          </form>
          <div className='mt-3'>
            <a href='http://localhost:3000/ResetPassword' className='u u-LR text-white'>
              Forgot Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
