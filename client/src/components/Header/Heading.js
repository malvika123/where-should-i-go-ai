import { useNavigate } from "react-router-dom";
import { landingPageHeader, POWEREDBYAI } from "../common/constants";
import Logo from "./Logo";
import "./style/Heading.css";

const Heading = () => {
  const navigate = useNavigate();
  return (
    <div className="heading">
      <div>
        <div className="logo-header">
          <Logo />
          <h4
            className="header-top"
            onClick={() => document.location.assign("/")}
          >
            {landingPageHeader}
          </h4>
        </div>
        <h7> {POWEREDBYAI}</h7>
      </div>

      <div className="login-pallet">
        <h2 className="about-btn">ABOUT</h2>
        <h2 className="pipe"> | </h2>
        <h2 className="login-btn" onClick={() => navigate("/login")}>
          LOGIN/SIGNUP
        </h2>
      </div>
    </div>
  );
};

export default Heading;
