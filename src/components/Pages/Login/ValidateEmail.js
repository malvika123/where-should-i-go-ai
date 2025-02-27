import { useNavigate } from "react-router-dom";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import Logo from "../../Header/Logo";
import { SixDigitPin } from "./SixDigitPin";
import { useEffect, useState } from "react";
import { Alert, GreenAlert } from "./Alert";
import { useSelector } from "react-redux";

import axios from "axios";
import {
  cuidCookie,
  GetRecommendation,
  getRecommendation,
  isUserLoggedIn,
  useRecommendation,
} from "../../common/utils";
import { Footer } from "../../Footer/Footer";
import "../style/validatePassword.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/dataSlice";
import { tripRecommendationPath } from "../../common/constants";

export const ValidateEmail = ({}) => {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [genOtp, setGenOtp] = useState(false);
  const isFypFlow = window?.location?.search?.includes("fyp");
  const isAccDelFlow = window?.location?.search?.includes("deleteAccount");
  const isFromTripTailor =
    window?.location?.search?.includes("from=tripTailor");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const [pin, setPin] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const userInfoCollected = JSON.parse(sessionStorage.getItem("collectedInfo"));
  const [greenAlert, setGreenAlert] = useState();

  const {
    days,
    mnth,
    gender,
    selectedStates,
    country,
    tripType,
    pets,
    hasFemale,
    hasKids,
    minValue,
    maxValue,
    currency,
    modifiedCurrency,
    slctdActsSet,
    text,
  } = userInfoCollected || {};

  useEffect(() => {
    if (isUserLoggedIn() && !isAccDelFlow) {
      window.location.href = "/";
    }
  }, []);

  const NavigateTopath = ({ path }) => {
    navigate(path);
  };

  useEffect(() => {
    setTimeout(() => setAlert(""), 3000);
  }, [alert]);

  const navigateTopath = (e) => {
    const btn = e.target;
    btn.classList.add("grey-btn");
    if (pin.length === 6) {
      const loginCall = async () => {
        try {
          const data = await axios.post("/api/user/ValidateOtp", {
            pin,
            email: userInfo?.email,
          });

          if (isFypFlow) {
            window.location.href = "/resetPassword";
          } else if (isAccDelFlow) {
            window.location.href = "/deleteAccount/validationAndConfirmation";
          } else if (isFromTripTailor) {
            try {
              setGreenAlert(
                "Getting your trip recommendation ready, please wait..."
              );

              const dataRec = await getRecommendation();
              dispatch(
                setUserData({
                  state: dataRec?.data?.jsonObj?.state,
                  reasonForStateChoice: dataRec?.data?.jsonObj?.reason,
                  area: dataRec?.data?.jsonObj?.["places_to_visit"],
                  underhyped: dataRec?.data?.jsonObj?.["off_beat_places"],
                  note: dataRec?.data?.jsonObj?.["precautions"],
                  avoidPlaces: dataRec?.data?.jsonObj?.["places_to_avoid"],
                  days,
                  mnth,
                  gender,
                  selectedStates,
                  country,
                  tripType,
                  pets,
                  hasFemale,
                  hasKids,
                  minValue,
                  maxValue,
                  currency,
                  modifiedCurrency,
                  slctdActsSet,
                  text,
                  recomm: `${JSON.stringify(dataRec?.data?.jsonObj)}`,
                })
              );
              NavigateTopath({ path: tripRecommendationPath });
            } catch (e) {
              //console.log("error", e);
            }
          } else {
            setAlert("login successful");
            window.location.href = "/tripTailor";
          }
        } catch (e) {
          btn.classList.remove("grey-btn");
          //console.log(e?.response?.data);
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
        const data = await axios.post("/api/user/generateOtp", {
          id: cuidCookie(),
          email: userInfo?.email,
        });
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
          <p className="validate-text">Let's validate your email</p>
          <p className="subtxt-login-vp">
            Enter the 6 digit pin you received on your email
          </p>
          <p className="subtxt-login-sub-vp">
            This is to ensure your account security
          </p>
          {alert && !greenAlert && <Alert msg={alert} success={successAlert} />}
          {greenAlert && <GreenAlert msg={greenAlert} />}
          <div className="login-box-one">
            <span className="input-txt-pin-x">Enter your pin here</span>
            <p className="input-txt-email">{userInfo?.email}</p>
            <SixDigitPin count={4} setPin={setPin} />
            <button className="button-vp" onClick={(e) => navigateTopath(e)}>
              Continue
            </button>
            <span className="didn-receive-txt">Didn't recieve OTP </span>{" "}
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
