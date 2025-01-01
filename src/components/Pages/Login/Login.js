import { useNavigate } from "react-router-dom";
import { navigateTopath } from "../../common/navigateTopath";
import Logo from "../../Header/Logo";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "../style/login.css";
import { PasswordInputField } from "./PasswordInputField";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "./Alert";
import { isUserLoggedIn } from "../../common/utils";
import { Footer } from "../../Footer/Footer";

const Login = () => {
  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState();
  const [disableCntBtn, setDisableCntBtn] = useState(true);
  const unauthorisedUser =
    window.location?.search.includes("unauthorised=true");
  const [alert, setAlert] = useState(
    unauthorisedUser ? "Your session is expired. Please login." : ""
  );

  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

  console.log(unauthorisedUser);
  const handleOnClick = () => {
    localStorage.setItem("userInfo", JSON.stringify({ email }));

    // const loginCall = async () => {
    //   try {
    //     const data = await axios.post(
    //       "https://midware-server-wsig.onrender.com/user/login",
    //       {
    //         email,
    //         password,
    //       }
    //     );
    //     console.log(data);
    //     window.location.href = "/validateEmail";
    //   } catch (e) {
    //     const error = e?.response?.data?.error || "Something went wrong !!";
    //     setAlert(error);
    //   }
    // };
    // loginCall();
    const API_URL = "https://midware-server-wsig.onrender.com/user/login";

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "1234" }),
    });
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
          <p>Log into your account</p>
          <p className="subtxt-login">
            Welcome back , lets beign with logging in
          </p>
          {alert && <Alert msg={alert} />}
          <div className="login-box">
            <p className="input-txt">Email</p>
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
                onClick={() => (window.location.href = "/forgotPassword")}
              >
                Forgot password
              </span>
            </a>
            <button
              className="button"
              disabled={disableCntBtn}
              onClick={() => handleOnClick()}
            >
              Continue
            </button>
            <span>
              New to this site{" "}
              <a>
                <span
                  onClick={() => (window.location.href = "/register")}
                  className="register-link"
                >
                  Register
                </span>
              </a>{" "}
            </span>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
