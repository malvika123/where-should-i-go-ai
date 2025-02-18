import { useNavigate } from "react-router-dom";
import { navigateTopath } from "../../common/navigateTopath";
import Logo from "../../Header/Logo";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "../style/login.css";
import { PasswordInputField } from "./PasswordInputField";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, GreenAlert } from "./Alert";
import { getRecommendation, isUserLoggedIn } from "../../common/utils";
import { Footer } from "../../Footer/Footer";
import { setUserData } from "../../store/slices/dataSlice";
import { useDispatch } from "react-redux";
import { tripRecommendationPath } from "../../common/constants";

const Login = () => {
  const navigate = useNavigate();
  const navigateTopath = (path) => {
    console.log("navigate", path);
    navigate(path);
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();

  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState();
  const [disableCntBtn, setDisableCntBtn] = useState(true);
  const unauthorisedUser =
    window.location?.search.includes("unauthorised=true");
  const fromTripTailor = window.location?.search.includes("from=tripTailor");
  const [alert, setAlert] = useState(
    unauthorisedUser ? "You are not logged in. Please login." : ""
  );
  const [greenAlert, setGreenAlert] = useState();

  const userInfoCollected = JSON.parse(localStorage.getItem("collectedInfo"));
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
  const searchParams = window.location?.search;

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

  const clickedLoginSkip = () => {
    if (unauthorisedUser && fromTripTailor) {
      const now = Date.now(); // Current time in milliseconds
      const twelveHoursLater = now + 1 * 60 * 60 * 1000; // Add 12 hours in milliseconds
      const epochTime = Math.floor(twelveHoursLater / 1000);
      localStorage.setItem("skippedLogin", epochTime);

      const dataRec = async () => {
        try {
          setGreenAlert(
            "Please wait, skipping login and getting your trip recommendation ready .... "
          );
          const data = await getRecommendation();

          dispatch(
            setUserData({
              state: data?.data?.jsonObj?.state,
              reasonForStateChoice: data?.data?.jsonObj?.reason,
              area: data?.data?.jsonObj?.["places_to_visit"],
              underhyped: data?.data?.jsonObj?.["off_beat_places"],
              note: data?.data?.jsonObj?.["precautions"],
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
              recomm: `${JSON.stringify(data?.data?.jsonObj)}`,
            })
          );
          console.log(data);
          navigateTopath("/tripRecommendation");
        } catch (e) {
          console.log("error", e);
        }
      };
      dataRec();
    }
  };

  const handleOnClick = (e) => {
    localStorage.setItem("userInfo", JSON.stringify({ email }));
    const btn = e.target;
    btn.classList.add("grey-btn");
    const loginCall = async () => {
      try {
        const data = await axios.post("/api/user/login", {
          email,
          password,
        });
        window.location.href = `/validateEmail${
          searchParams ? searchParams : ""
        }`;
      } catch (e) {
        btn.classList.remove("grey-btn");
        const error = e?.response?.data?.error || "Something went wrong !!";
        setAlert(error);
      }
    };
    loginCall();
  };

  useEffect(() => {
    setTimeout(() => setAlert(""), 3000);
  }, [alert]);

  useEffect(() => {
    if (email && password) {
      setDisableCntBtn(false);
    } else {
      setDisableCntBtn(true);
    }
  }, [email, password]);
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
          <p className="subtxt-login-head">Log into your account</p>
          <p className="subtxt-login-txt">
            Welcome back, lets begin with logging in
          </p>
          {alert && !greenAlert && <Alert msg={alert} />}
          {greenAlert && <GreenAlert msg={greenAlert} />}
          <div className="login-box-one">
            <p className="input-txt-email-head">Email</p>
            <input
              className="input-field-email"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <PasswordInputField setPassword={setPassword} />
            <a>
              <span
                className="forgot-password"
                onClick={() =>
                  (window.location.href = `/forgotPassword${
                    searchParams ? searchParams : ""
                  }`)
                }
              >
                Forgot password
              </span>
            </a>
            <button
              className="ctn-button"
              disabled={disableCntBtn}
              onClick={(e) => handleOnClick(e)}
            >
              Continue
            </button>
            <span>
              <p className="new-site-txt"> New to this site? </p>
              <a>
                <span
                  onClick={() =>
                    (window.location.href = `/register${
                      searchParams ? searchParams : ""
                    }`)
                  }
                  className="register-link"
                >
                  Register
                </span>
              </a>{" "}
            </span>{" "}
            {unauthorisedUser && fromTripTailor && (
              <p className="skip" onClick={() => clickedLoginSkip()}>
                Skip
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
