import LoginForm from "./loginComponents/loginForm/LoginForm";
import LoginSvg from "./loginComponents/LoginSvg";
import "./_login.scss";

const Login = () => {
  return (
    <div className="loginPage">
      <h1 className="loginHeading">Login</h1>
      <div className="login">
        <LoginSvg />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
