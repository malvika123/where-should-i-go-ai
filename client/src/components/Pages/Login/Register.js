import { useNavigate } from "react-router-dom";
import Logo from "../../Header/Logo";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "../style/register.css";
import { PasswordChecker } from "./PasswordChecker";
import { PasswordInputField } from "./PasswordInputField";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "./Alert";

export const Register = () => {
  const navigate = useNavigate();
  const navigateTopath = (path) => {
    navigate(path);
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState();
  const [name, setName] = useState(userInfo?.name);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [disableCntBtn, setDisableCntBtn] = useState(true);
  const [isPasswordAdequate, setIsPasswordAdequate] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    setTimeout(() => setAlert(""), 3000);
  }, [alert]);

  const handleChange = () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userInfo, email, name, lastName })
    );

    const registerCall = async () => {
      try {
        const data = await axios.post("/user/register", {
          email,
          password,
          name,
          lname: lastName,
        });
        console.log("io", data);
        setRegisterSuccess(true);
      } catch (e) {
        const error = e?.response?.data?.error || "Something went wrong !!";
        setAlert(error);
      }
    };
    registerCall();
    if (registerSuccess) navigateTopath("/validateEmail");
  };

  useEffect(() => {
    if (email && password && name && lastName && isPasswordAdequate) {
      setDisableCntBtn(false);
    } else {
      setDisableCntBtn(true);
    }
  }, [email, password, name, lastName, isPasswordAdequate]);

  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="login">
        <Logo />
        <p>Let's create an account for you</p>
        <p className="subtxt-login">Please fill your Information below</p>
        {alert && <Alert msg={alert} />}
        <div className="login-box">
          <p className="input-txt">First Name</p>
          <input
            className="input-field"
            placeholder="Enter your first name..."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <p className="input-txt">Last Name</p>
          <input
            className="input-field"
            type="text"
            placeholder="Enter your last name..."
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <p className="input-txt">Email</p>
          <input
            className="input-field-email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInputField setPassword={setPassword} />
          <PasswordChecker
            password={password}
            setIsPasswordAdequate={setIsPasswordAdequate}
          />
          <button
            className="button"
            disabled={disableCntBtn}
            onClick={() => handleChange()}
          >
            Continue
          </button>
          <span>
            Already have an account{" "}
            <a>
              <span
                className="login-link"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </span>
            </a>
          </span>{" "}
        </div>
      </div>
    </div>
  );
};
