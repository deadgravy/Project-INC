import Input from "../components/login/Input";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="row">
      <div className="loginContainer card col-6 offset-3 p-4 py-6">
        <div className="login">
          <img src="/logos/firc-logo.png" alt="FIRC Logo" className="mb-4" />
          <Input icon="fas fa-user" placeholder="User ID/Email" type="email" />
          <Input icon="fa fa-key" type="password" placeholder="Password" />
          <div className="mt-4">
            <a href="!#" className="u u-LR">
              Forgot Password?
            </a>
            <input
              type="submit"
              className="btn-primary u-pull-right"
              style={{ padding: "0" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
