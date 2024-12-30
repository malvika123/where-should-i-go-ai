import { useNavigate } from "react-router-dom";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import Logo from "../../Header/Logo";
import { SixDigitPin } from "./SixDigitPin";
import { useEffect, useState } from "react";
import { Alert } from "./Alert";
import axios from "axios";
import { cuidCookie, isUserLoggedIn } from "../../common/utils";
import { Footer } from "../../Footer/Footer";

export const ValidateEmail = ({}) => {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [genOtp, setGenOtp] = useState(false);
  const isFypFlow = window?.location?.search?.includes("fyp");
  const [alert, setAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const [pin, setPin] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setAlert(""), 3000);
  }, [alert]);

  const navigateTopath = () => {
    if (pin.length === 6) {
      const loginCall = async () => {
        try {
          const data = await axios.post("/user/ValidateOtp", {
            pin,
            email: userInfo?.email,
          });
          console.log("data");

          if (isFypFlow) {
            window.location.href = "/resetPassword";
          } else {
            setAlert("login successful");
            window.location.href = "/tripTailor";
          }
        } catch (e) {
          console.log(e?.response?.data);
          let error;
          if (e?.response?.data?.status === 1300) {
            error = "Entered pin is incorrect";
          } else {
            error = "Something went wrong !!";
          }
          setAlert(error);
        }
      };
      loginCall();
    } else {
      setAlert("Please check the Pin you entered");
    }
  };

  const genOtpCall = () => {
    try {
      const loginCall = async () => {
        const data = await axios.post("/user/generateOtp", {
          id: cuidCookie(),
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
          <p>Let's validate your email</p>
          <p className="subtxt-login">
            Enter the 6 digit pin you received on your email
          </p>
          <p className="subtxt-login-sub">
            This is to ensure your account security
          </p>
          {alert && <Alert msg={alert} success={successAlert} />}
          <div className="login-box">
            <p className="input-txt">Type your pin here</p>
            <p className="input-txt-email">{userInfo?.email}</p>
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
      <Footer />
    </div>
  );
};
