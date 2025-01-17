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
import SlickSlider from "./SlickSlider";
import { Footer } from "../Footer/Footer";
import {
  navigateTopath,
  redirectToAboutPage,
  redirectToLoginPage,
} from "../common/navigateTopath";
import { CookiePolicy } from "./CookiePolicy";
import ImgSlider from "./tripRecommendation.js/ImgSlider";
import { useMediaQuery } from "react-responsive";

const LandingPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const isMidScreen = useMediaQuery({ query: "(max-width: 1307px)" });
  const isVerySmallScreen = useMediaQuery({ query: "(max-width: 358px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 765px)" });
  const [showCookiePolicy, setShowCookiePolicy] = useState(true);
  const showCP = localStorage.getItem("hidePrivacyPolicyForTime");

  const checkIfCookiePolicyNoShowExpired = () => {
    const timeNow = Math.floor(Date.now() / 1000);
    if (showCP < timeNow) {
      setShowCookiePolicy(true);
    } else setShowCookiePolicy(false);
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      const name = async () => {
        try {
          const data = await getUserName();
          setUserName(data?.name);
        } catch (e) {
          localStorage.removeItem("userInfo");
        }
      };
      name();
    }
    checkIfCookiePolicyNoShowExpired();
  }, []);

  return (
    <div>
      <div className="content-sec-lp">
        <div className="head-sec">
          <Heading name={userName} />
          <h1 className="header2">
            <Typewriter
              options={{
                strings: [heading],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </div>
        <div
          className="searchbox"
          onClick={() => navigateTopath({ path: tripPlannerPath })}
        >
          <FaMagnifyingGlassLocation className="magGlass" />
          <input
            id="txtBox"
            className=""
            placeholder={placeholderInput}
            readonly="readonly"
          />
          <button className="search-button">GO</button>
        </div>
        <div className="img-slider">
          <SlickSlider />
        </div>
        <div className="text-lp">
          <h1 className="footer-text-head">
            Welcome to Your Personal Travel Companion
          </h1>
          <p className="footer-text-sub">
            Say goodbye to endless hours of research and confusion while
            planning your next trip. Where Should I Go is here to revolutionize
            the way you explore the world. Using cutting-edge AI technology, we
            provide you with personalized destination recommendations based on
            your preferences, interests, and travel goals. Whether you're
            planning a romantic getaway, a solo adventure, or a family vacation,
            we've got you covered!
          </p>
          <h2 className="footer-text-head">How It Works</h2>
          <p className="footer-text-sub">
            1. Share Your Preferences Tell us what you’re looking for—be it
            sandy beaches, bustling cities, serene mountains, or historical
            landmarks.
          </p>
          <p className="footer-text-sub">
            2. Let AI Do the Magic Our AI-powered system analyzes your input to
            curate tailored travel recommendations that align with your tastes.
          </p>
          <p className="footer-text-sub">
            3.Discover Your Dream Destination Get actionable suggestions in
            seconds, along with travel tips to make your journey unforgettable.
          </p>
          <p className="footer-text-head">Why Choose Us?</p>
          <ul>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Time-Saving:</span> No more
                browsing through endless travel blogs or forums. Our
                recommendations are instant.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>
                  Personalized Results:
                </span>{" "}
                Your preferences, your destinations. Every suggestion is unique
                to you.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>
                  Stress-Free Planning:
                </span>{" "}
                From destination ideas to practical tips, we simplify the entire
                process.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Expert Insights:</span> Our
                system combines AI expertise with travel data to ensure accuracy
                and satisfaction.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Time-Saving:</span> No more
                browsing through endless travel blogs or forums. Our
                recommendations are instant.
              </p>
            </li>
          </ul>
          <h1 className="footer-text-head">
            Popular Destinations Our Users Love
          </h1>
          <ImgSlider
            place="Santorini"
            showMultipleSlides={
              isVerySmallScreen ? 2 : isSmallScreen ? 3 : isMidScreen ? 5 : 5
            }
            classnm={
              isSmallScreen ? "lp-img" : isMidScreen ? "lp-img-mid" : "res-img"
            }
            textClassnm={
              isVerySmallScreen
                ? "res-img-txt-lp-mid"
                : isSmallScreen
                ? "res-img-txt-lp-mid"
                : isMidScreen
                ? "res-img-txt-lp"
                : "res-img-txt"
            }
          />
          <p className="footer-text-sub">
            Explore some of the top destinations frequently recommended by our
            platform:
          </p>
          <ul>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Santorini, Greece:</span> A
                romantic escape with stunning sunsets.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Kyoto, Japan:</span>
                Traditional temples and mesmerizing cherry blossoms.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Bali, Indonesia:</span>
                Perfect for tropical relaxation and cultural immersion.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Paris, France:</span> The
                timeless city of love and art.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Banff, Canada:</span> A
                nature lover’s paradise in the Canadian Rockies.
              </p>
            </li>
          </ul>

          <p className="footer-text-head">Ready to Start Your Journey?</p>
          <p className="footer-text-sub">
            Stop stressing about where to go. Let us help you find the ideal
            destination tailored just for you.{" "}
            <span
              onClick={redirectToLoginPage}
              style={{
                cursor: "pointer",
                color: "rgb(57, 138, 192)",
                background: "yellow",
              }}
            >
              👉 Click Here to Get Started!
            </span>
          </p>
          <p className="footer-text-head">About Us</p>
          <p className="footer-text-sub">
            At Where Should I Go, we blend the power of AI with a passion for
            travel to create a seamless, personalized experience for every
            traveler. Our mission is to inspire wanderlust while making travel
            planning effortless.{" "}
            <span
              onClick={redirectToAboutPage}
              style={{
                color: "rgb(57, 138, 192)",
                background: "yellow",
                cursor: "pointer",
              }}
            >
              Click here to read more
            </span>
          </p>
        </div>
      </div>
      <Footer />
      {showCookiePolicy && <CookiePolicy class="sticky-bottom" />}
    </div>
  );
};

export default LandingPage;
