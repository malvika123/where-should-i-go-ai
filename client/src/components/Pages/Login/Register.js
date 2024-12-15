import { useNavigate } from "react-router-dom";
import Logo from "../../Header/Logo";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "../style/register.css";
import { PasswordChecker } from "./PasswordChecker";

export const Register = () => {
  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };
  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="login">
        <Logo />
        <p>Let's create an account for you</p>
        <p className="subtxt-login">Please fill your Information below</p>
        <div className="login-box">
          <p className="input-txt">First Name</p>
          <input
            className="input-field"
            placeholder="Enter your first name..."
          />
          <p className="input-txt">Last Name</p>
          <input
            className="input-field"
            type="text"
            placeholder="Enter your last name..."
          />
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
          <PasswordChecker />
          <button
            className="button"
            onClick={() => navigateTopath("/validateEmail")}
          >
            Continue
          </button>
          <span>Already have an account</span>{" "}
          <a>
            <span>Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};
