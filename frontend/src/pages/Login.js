import Input from '../components/login/Input'
import '../styles/login.css'

const Login = () => {
  return (
    <div className="loginContainer">
      <div className="login">
        <img src="/logos/firc-logo.png" alt="FIRC Logo" className="mb-4" />
        <Input icon="fas fa-user" placeholder="User ID/Email" type="email" />
        <Input icon="fa fa-key" type="password" placeholder="Password"/>
        <a href="!#" class="underline">Forgot Password?</a>
        <input type="submit" class="btn-primary u-pull-right" style={{padding: "0"}}/>
      </div>
    </div>
  )
}

export default Login;