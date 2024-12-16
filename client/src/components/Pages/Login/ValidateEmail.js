import { useNavigate } from "react-router-dom";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import Logo from "../../Header/Logo";
import { SixDigitPin } from "./SixDigitPin";
import { useEffect, useState } from "react";
import { Alert } from "./Alert";
import axios from "axios";

export const ValidateEmail = ({}) => {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [genOtp, setGenOtp] = useState(false);
  const isFypFlow = window?.location?.search?.includes("fyp");
  const [alert, setAlert] = useState("");
  const [pin, setPin] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    setTimeout(() => setAlert(""), 3000);
  }, [alert]);

  const navigateTopath = () => {
    if (pin.length === 6) {
      try {
        const loginCall = async () => {
          const data = await axios.post("/user/ValidateOtp", {
            pin,
            email: userInfo?.email,
          });
          console.log(data);
        };
        loginCall();
      } catch (e) {}

      if (isFypFlow) {
        window.location.href = "/resetPassword";
      } else window.location.href = "/payment";
    } else {
      setAlert("Please check the Pin you entered");
    }
  };

  const genOtpCall = () => {
    try {
      const loginCall = async () => {
        const data = await axios.post("/user/generateOtp", {
          email: userInfo?.email,
        });
        console.log(data);
      };
      loginCall();
      setAlert("Otp generated");
    } catch (e) {
      setAlert("Something happened while generating Otp");
    }
  };

  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="login">
        <Logo />
        <p>Let's validate your email</p>
        <p className="subtxt-login">
          Enter the 6 digit pin you received on your email
        </p>
        <p className="subtxt-login-sub">
          This is to ensure your account security
        </p>
        {alert && <Alert msg={alert} />}
        <div className="login-box">
          <p className="input-txt">Type your pin here</p>
          <SixDigitPin count={4} setPin={setPin} />
          <button className="button" onClick={() => navigateTopath()}>
            Continue
          </button>
          <span>Didn't recieve OTP </span>{" "}
          <a>
            <span className="gen-otp" onClick={() => genOtpCall()}>
              Generate otp
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
