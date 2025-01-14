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
  const searchParams = window.location?.search;
  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

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
          {alert && <Alert msg={alert} />}
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
