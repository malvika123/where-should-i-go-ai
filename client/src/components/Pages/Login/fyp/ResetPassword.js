import { useNavigate } from "react-router-dom";
import "../../style/login.css";
import TripPlannerHeader from "../../../Header/TripPlannerHeader";
import Logo from "../../../Header/Logo";
import { PasswordChecker } from "../PasswordChecker";
import { PasswordInputField } from "../PasswordInputField";

const ResetPassword = () => {
  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };

  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="login">
        <Logo />
        <p>Reset Password</p>
        <p className="subtxt-login">
          Ensure your new password doesn't matches your last two
        </p>
        <div className="login-box">
          <PasswordInputField />
          <PasswordChecker />
          <button
            className="button"
            onClick={() => navigateTopath("/validateEmail")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
