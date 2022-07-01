import Input from '../components/login/Input';
import '../styles/login.css';

const SignUp = () => {
  return (
    <div className='row loginPage'>
      <div className='loginContainer col-12'>
        <div className='card offset-4 p-4 px-6'>
          <h2>Welcome Back to FIRC!</h2>
          <p>
            Please fill in your relevant details to sign up for a new account with FIRC!
          </p>
          <form>
            <div className='row level'>
              <div className='col-6'>
                <Input
                  icon='fas fa-user'
                  placeholder='First Name'
                  type='text'
                />
              </div>
              <div className='col-6'>
                <Input icon='fas fa-user' placeholder='Last Name' type='text' />
              </div>
            </div>
            <div className='row level'>
              <div className='col-6'>
                <Input
                  icon='fas fa-envelope'
                  placeholder='Email'
                  type='email'
                />
              </div>
              <div className='col-6'>
                <Input
                  icon='fas fa-phone'
                  placeholder='Contact'
                  type='tel'
                />
              </div>
            </div>
            <div className='row level px-1'>
              <Input icon='fa fa-key' type='password' placeholder='Password' />
            </div>
            <button className='btn-danger mt-2 mr-1 u-pull-right'>CREATE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
