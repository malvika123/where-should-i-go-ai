import { useNavigate } from "react-router-dom";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import Logo from "../../Header/Logo";
import { SixDigitPin } from "./SixDigitPin";
import { useState } from "react";

export const ValidateEmail = ({}) => {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [genOtp, setGenOtp] = useState(false);
  const isFypFlow = window?.location?.search?.includes("fyp");
  const navigateTopath = (path) => {
    if (isFypFlow) {
      window.location.href = "/resetPassword";
    } else navigate(path);
  };

  const genOtpAlert = () => {};

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
        <div className="login-box">
          <p className="input-txt">Type your pin here</p>
          <SixDigitPin count={4} />
          <button className="button" onClick={() => navigateTopath("/payment")}>
            Continue
          </button>
          <span>Didn't recieve OTP </span>{" "}
          <a>
            <span className="gen-otp" onClick={() => genOtpAlert()}>
              Generate otp
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
