import Input from '../components/login/Input';
import '../styles/login.css';

const Login = () => {
  return (
    <div className='row loginPage'>
      <div className='loginContainer col-12'>
        <div className='card offset-4 p-4 px-6'>
          <h2>Welcome Back to FIRC!</h2>
          <p>
            Please fill in your relevant details before logging on to see the dashboard! 
          </p>
          <form>
            <h6 className='m-0'>Username</h6>
            <div className='row level'>
              <Input
                icon='fas fa-user'
                placeholder='User ID/Email'
                type='email'
              />
            </div>
            <h6 className='m-0'>Password</h6>
            <div className='row level'>
              <Input icon='fa fa-key' type='password' placeholder='Password' />
            </div>
            <button className='btn-danger mt-2 u-pull-right'>SIGN IN</button>
          </form>
          <div className='mt-3'>
            <a href='!#' className='u u-LR text-white'>
              Forgot Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
