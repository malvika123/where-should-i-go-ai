import { useNavigate } from "react-router-dom";
import { navigateTopath } from "../../../common/navigateTopath";
import Logo from "../../../Header/Logo";
import TripPlannerHeader from "../../../Header/TripPlannerHeader";
import "../../style/login.css";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [email, setEmail] = useState(userInfo?.email);
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };

  const handleChange = () => {
    localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, email }));
    try {
      const loginCall = async () => {
        const data = await axios.post("/user/forgotPassword", {
          email,
        });
        console.log(data);
      };
      loginCall();
    } catch (e) {}
    window.location.href = "/validateEmail?fyp=true";
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
        {alert && <Alert msg={alert} />}
        <div className="login-box">
          <p className="input-txt">Email(Registered email)</p>
          <input
            className="input-field-email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button" onClick={() => handleChange()}>
            Continue
          </button>
          <span>Remember your password? </span>{" "}
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
  );
};

export default ForgotPassword;
