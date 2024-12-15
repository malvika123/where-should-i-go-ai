import { useNavigate } from "react-router-dom";
import { navigateTopath } from "../../../common/navigateTopath";
import Logo from "../../../Header/Logo";
import TripPlannerHeader from "../../../Header/TripPlannerHeader";
import "../../style/login.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };

  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="login">
        <Logo />
        <p>Recover your Password</p>
        <p className="subtxt-login">
          Forgot your email? Don't worry follow the steps and get in
        </p>
        <div className="login-box">
          <p className="input-txt">Email(Registered email)</p>
          <input
            className="input-field-email"
            placeholder="Enter your email..."
          />
          <button
            className="button"
            onClick={() => navigateTopath("/validateEmail?fyp=true")}
          >
            Continue
          </button>
          <span>Remember your password? </span>{" "}
          <a>
            <span
              onClick={() => navigateTopath("/login")}
              className="register-link"
            >
              Login
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
