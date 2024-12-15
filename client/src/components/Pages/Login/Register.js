import { useNavigate } from "react-router-dom";
import Logo from "../../Header/Logo";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "../style/register.css";
import { PasswordChecker } from "./PasswordChecker";
import { PasswordInputField } from "./PasswordInputField";
import { useState } from "react";

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
  console.log(userInfo);
  const handleChange = () => {
    navigateTopath("/validateEmail");
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userInfo, email, name, lastName })
    );
  };
  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="login">
        <Logo />
        <p>Let's create an account for you</p>
        <p className="subtxt-login">Please fill your Information below</p>
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
          <PasswordChecker password={password} />
          <button className="button" onClick={() => handleChange()}>
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
