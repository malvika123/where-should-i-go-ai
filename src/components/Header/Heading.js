import { useNavigate } from "react-router-dom";
import { landingPageHeader, POWEREDBYAI } from "../common/constants";
import Logo from "./Logo";
import "./style/Heading.css";
import { useState } from "react";
import axios from "axios";
import { cuidCookie } from "../common/utils";
import { navigateTopath, redirectToAboutPage } from "../common/navigateTopath";
import { FcIdea } from "react-icons/fc";

const Heading = ({ name = "", showTryourService = false }) => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const logoutUser = () => {
    //console.log("user loggedout");

    const logoutUser = async () => {
      try {
        const data = await axios.post("/api/user/logout", {
          id: cuidCookie(),
        });
      } catch (e) {
        console.log("something went wrong");
      } finally {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("hidePrivacyPolicyForTime");
        localStorage.removeItem("skippedLogin");
        sessionStorage.removeItem("skippedLogin");
        localStorage.removeItem("collectedInfo");
        sessionStorage.removeItem("collectedInfo");
        window.location.reload();
      }
    };
    logoutUser();
  };
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
        <h7 className="pwrd-txt"> {POWEREDBYAI}</h7>
      </div>

      {showTryourService ? (
        <div>
          <h2 className="try-btn" onClick={navigateTopath}>
            Try AI trip suggestions <FcIdea />
          </h2>
        </div>
      ) : (
        <div className="login-pallet">
          <h2 className="about-btn" onClick={redirectToAboutPage}>
            ABOUT
          </h2>
          <h2 className="pipe"> | </h2>
          {name ? (
            <div>
              <h2
                className="user-name"
                onClick={() => setShowLogout((prev) => !prev)}
              >
                {name}
              </h2>
              {showLogout && (
                <div className="desktop-flyout-pallet">
                  <h2 className="pallet-elt" onClick={() => logoutUser()}>
                    logout
                  </h2>
                </div>
              )}
            </div>
          ) : (
            <h2 className="login-btn" onClick={() => navigate("/login")}>
              LOGIN/SIGNUP
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Heading;
