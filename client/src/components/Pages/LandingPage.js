import { useNavigate } from "react-router-dom";
import {
  aboutTextLandingPage,
  heading,
  placeholderInput,
  tripPlannerPath,
} from "../common/constants";
import Heading from "../Header/Heading";
import "./style/LandingPage.css";
import Typewriter from "typewriter-effect";
import vid3 from "../images/3015510-hd_1920_1080_24fps.mp4";
import { enableVideoInBackground } from "../Featureflags";
import img from "../images/Screenshot 2024-12-04 at 1.11.21 PM.png";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  getUserName,
  isUserLoggedIn,
  isUserSessionValid,
} from "../common/utils";

const LandingPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const NavigateTopath = async ({ path }) => {
    const isSessionValid = await isUserSessionValid();
    if (isSessionValid) {
      window.document.location.href = "/tripTailor";
    } else {
      window.document.location.href = "/login";
    }
  };

  useEffect(() => {
    console.log("op");
    if (isUserLoggedIn()) {
      const name = async () => {
        try {
          const data = await getUserName();
          setUserName(data?.name);
        } catch (e) {}
      };
      name();
    }
  }, []);

  return (
    <div className="body">
      {enableVideoInBackground && (
        <video className="bg-vid" autoPlay loop muted>
          <source src={vid3} type="video/mp4" />
        </video>
      )}

      <div className="background">
        <div className="head-sec">
          <Heading name={userName} />
          <div className="header2">
            <Typewriter
              options={{
                strings: [heading],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>

        <div className="searchbox">
          <FaMagnifyingGlassLocation className="magGlass" />
          <input
            id="txtBox"
            className=""
            placeholder={placeholderInput}
            disabled
          />
          <button
            className="search-button"
            onClick={() => NavigateTopath({ path: tripPlannerPath })}
          >
            GO
          </button>
        </div>
        <div>
          <img className="image-lp" src={img} />
        </div>
        <div>
          <p className="footer-text">{aboutTextLandingPage}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
