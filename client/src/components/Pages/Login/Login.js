import { useNavigate } from "react-router-dom";
import { navigateTopath } from "../../common/navigateTopath";
import Logo from "../../Header/Logo";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "../style/login.css";
import { PasswordInputField } from "./PasswordInputField";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState();

  const handleOnClick = () => {
    window.location.href = "/validateEmail";
    localStorage.setItem("userInfo", JSON.stringify({ email }));
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <PasswordInputField setPassword={setPassword} />
          <a>
            <span
              className="forgot-password"
              onClick={() => (window.location.href = "/forgotPassword")}
            >
              Forgot password
            </span>
          </a>
          <button className="button" onClick={() => handleOnClick()}>
            Continue
          </button>
          <span>
            New to this site{" "}
            <a>
              <span
                onClick={() => (window.location.href = "/register")}
                className="register-link"
              >
                Register
              </span>
            </a>{" "}
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
