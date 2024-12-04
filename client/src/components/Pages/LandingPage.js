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

const LandingPage = () => {
  const navigate = useNavigate();

  const NavigateTopath = ({ path }) => {
    navigate(path);
  };

  return (
    <div className="body">
      {enableVideoInBackground && (
        <video className="bg-vid" autoPlay loop muted>
          <source src={vid3} type="video/mp4" />
        </video>
      )}

      <div className="background">
        <div className="head-sec">
          <Heading />
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
