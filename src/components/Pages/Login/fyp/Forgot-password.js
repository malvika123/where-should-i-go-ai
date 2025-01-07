import { useNavigate } from "react-router-dom";
import { navigateTopath } from "../../../common/navigateTopath";
import Logo from "../../../Header/Logo";
import TripPlannerHeader from "../../../Header/TripPlannerHeader";
import "../../style/login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { isUserLoggedIn } from "../../../common/utils";
import { Footer } from "../../../Footer/Footer";
import "../../style/forgot-pass.css";

const ForgotPassword = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [email, setEmail] = useState(userInfo?.email);
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/";
    }
  }, []);
  const handleChange = () => {
    localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, email }));
    try {
      const fypCall = async () => {
        const data = await axios.post("/api/user/forgotPassword", {
          email,
        });
        window.location.href = "/validateEmail?fyp=true";
      };
      fypCall();
    } catch (e) {
    } finally {
    }
    //
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
        <div className="login">
          <Logo />
          <p className="recover-txt">Recover your Password</p>
          <p className="subtxt-login-fyp">
            Forgot your email? Don't worry follow the steps and get in
          </p>
          {alert && <Alert msg={alert} />}
          <div className="login-box-fyp">
            <p className="input-txt">Email(Registered email)</p>
            <input
              className="input-field-email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button-fyp" onClick={() => handleChange()}>
              Continue
            </button>
            <span className="rem-pass">Remember your password? </span>{" "}
            <a>
              <span
                onClick={() => navigateTopath("/validateEmail?fyp=true")}
                className="register-link"
              >
                Login
              </span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
