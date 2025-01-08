import "../../style/login.css";
import TripPlannerHeader from "../../../Header/TripPlannerHeader";
import Logo from "../../../Header/Logo";
import { PasswordChecker } from "../PasswordChecker";
import { PasswordInputField } from "../PasswordInputField";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "../Alert";
import { isUserLoggedIn } from "../../../common/utils";
import { Footer } from "../../../Footer/Footer";
import "../../style/reset-pass.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState();
  const [isPasswordAdequate, setIsPasswordAdequate] = useState(false);
  const [alert, setAlert] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setAlert(""), 3000);
  }, [alert]);

  const navigateTopath = (e) => {
    const btn = e.target;
    btn.classList.add("grey-btn");
    if (newPassword && isPasswordAdequate) {
      const resetPasswordCall = async () => {
        try {
          const data = await axios.post("/api/user/resetPassword", {
            email: userInfo?.email,
            newPassword,
          });
          window.location.href = "/tripTailor";
        } catch (e) {
          btn.classList.remove("grey-btn");

          const error = e?.response?.data?.error || "Something went wrong !!";
          setAlert(error);
        }
      };

      resetPasswordCall();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <div>
        <TripPlannerHeader notshowSubHeader={true} />
        <div className="login-fp">
          <Logo />
          <p className="reset-pass-txt">Reset Password</p>
          <p className="subtxt-login-reset">
            Ensure your new password doesn't matches your last two
          </p>
          {alert && <Alert msg={alert} />}
          <div className="login-box-reset">
            <PasswordInputField setPassword={setNewPassword} />
            <PasswordChecker
              password={newPassword}
              setIsPasswordAdequate={setIsPasswordAdequate}
            />
            <button className="button" onClick={(e) => navigateTopath(e)}>
              Continue
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
