import { useNavigate } from "react-router-dom";
import { navigateTopath } from "../../common/navigateTopath";
import Logo from "../../Header/Logo";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "../style/login.css";

const Login = () => {
  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };

  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="login">
        <Logo />
        <p>Log into your account</p>
        <p className="subtxt-login">
          Welcome back , lets beign with logging in
        </p>
        <div className="login-box">
          <p className="input-txt">Email</p>
          <input
            className="input-field-email"
            placeholder="Enter your email..."
          />
          <p className="input-txt">Password</p>
          <input
            className="input-field"
            type="password"
            placeholder="Enter your password..."
          />
          <a>
            <span
              className="forgot-password"
              onClick={() => (window.location.href = "/forgotPassword")}
            >
              Forgot password
            </span>
          </a>
          <button
            className="button"
            onClick={() => navigateTopath("/validateEmail")}
          >
            Continue
          </button>
          <span>New to this site </span>{" "}
          <a>
            <span
              onClick={() => (window.location.href = "/register")}
              className="register-link"
            >
              Register
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
