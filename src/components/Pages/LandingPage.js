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
import { IoPersonCircle } from "react-icons/io5";
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
          <h1 className="lp-text-pri-head">
            Welcome to Your Ultimate Trip Planner
          </h1>
          <h2 className="footer-text-head">Discover Your Next Destination</h2>
          <p className="footer-text-sub">
            Confused about where to travel? Let our AI customize the perfect
            trip based on your preferences and requirements. Say goodbye to
            hours of endless research and confusion while planning your next
            adventure. Where Should I Go is here to revolutionize your travel
            experience. Powered by advanced AI travel technology, we provide
            personalized destination recommendations based on your preferences,
            interests, and travel goals. Whether you're planning a romantic
            getaway, a solo adventure, or a family vacation, we’ve got you
            covered!
          </p>
          <section style={{ marginBottom: "20px", marginTop: "20px" }}>
            <h2 className="footer-text-head">How Our Trip Planner Works</h2>

            <div>
              <h3 className="footer-text-sub" style={{ fontWeight: "bold" }}>
                1. Share Your Preferences
              </h3>
              <p className="footer-text-sub">
                Let us know what you’re dreaming of—whether it’s sandy beaches,
                vibrant cityscapes, peaceful mountains, or iconic historical
                landmarks.
              </p>
            </div>

            <div>
              <h3 className="footer-text-sub" style={{ fontWeight: "bold" }}>
                2. Let AI Craft Your Journey
              </h3>
              <p className="footer-text-sub">
                Our AI-powered trip planner analyzes your input to curate
                tailored travel recommendations that match your interests.
              </p>
            </div>
            <div>
              <h3 className="footer-text-sub" style={{ fontWeight: "bold" }}>
                3.Discover Your Dream Destination
              </h3>
              <p className="footer-text-sub">
                Get actionable suggestions in seconds, complete with travel tips
                and ideas to make your journey unforgettable.
              </p>
            </div>
            <div>
              <h3 className="footer-text-sub" style={{ fontWeight: "bold" }}>
                3. Plan with Confidence
              </h3>
              <p className="footer-text-sub">
                Use our suggestions to craft a memorable journey tailored just
                for you.
              </p>
            </div>
          </section>

          <p className="footer-text-head">Why Choose Where Should I Go?</p>
          <ul>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>AI-driven:</span> AI-driven
                personalized travel recommendations
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Save Time:</span> No need
                to browse countless travel blogs or forums. We deliver instant
                recommendations.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>
                  Personalized Results:
                </span>{" "}
                Every destination is curated just for you, based on your unique
                preferences.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>
                  Stress-Free Planning:
                </span>{" "}
                From destination inspiration to practical tips, we make trip
                planning effortless.
              </p>
            </li>
            <li>
              <p className="footer-text-sub">
                <span style={{ fontWeight: "bold" }}>Unique interests:</span>{" "}
                Find hidden gems based on your unique interests
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
          {/* <section id="testimonials">
            <div className="container">
              <h2 className="footer-text-head">What Travelers Are Saying</h2>
              <div className="testimonials">
                <marquee
                  loop="1"
                  style={{
                    backgroundColor: "pink",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <section>
                    <span
                      style={{
                        marginRight: "20px",
                        fontSize: "20px",
                        backgroundColor: "rgb(37, 102, 158)",
                        color: "white",
                        padding: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      "I was completely lost, but this platform guided me to the
                      perfect destination. A game-changer!" –
                      <IoPersonCircle
                        style={{ marginTop: "10px", color: "yellow" }}
                      />{" "}
                      Emily R.
                    </span>
                    <span
                      style={{
                        marginRight: "20px",
                        fontSize: "20px",
                        backgroundColor: "rgb(37, 102, 158)",
                        color: "white",
                        padding: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      "The AI suggestions were spot-on and saved me so much
                      time." –
                      <IoPersonCircle
                        style={{ marginTop: "10px", color: "yellow" }}
                      />{" "}
                      Michael D.
                    </span>
                    <span
                      style={{
                        marginRight: "20px",
                        fontSize: "20px",
                        backgroundColor: "rgb(37, 102, 158)",
                        color: "white",
                        padding: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      "I discovered places I never would have thought of thanks
                      to this site." –
                      <IoPersonCircle
                        style={{ marginTop: "10px", color: "yellow" }}
                      />{" "}
                      Sophia L.
                    </span>
                  </section>
                </marquee>
              </div>
            </div>
          </section> */}

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
