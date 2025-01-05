import TripPlannerHeader from "../Header/TripPlannerHeader";
import { FcAbout } from "react-icons/fc";
import { Footer } from "../Footer/Footer";
import "./style/About.css";
import { redirectToHomePage } from "../common/navigateTopath";
const About = () => {
  return (
    <div className="about-head-div">
      <TripPlannerHeader notshowSubHeader />
      <div className="sub-body">
        <p className="about-us-header">
          About us <FcAbout style={{ backgroundColor: "yellow" }} />
          <div style={{ backgroundColor: "gray", height: "1px" }}></div>
        </p>

        <div className="about-sub-txt">
          <p className="about-sub-txt">
            Welcome to{" "}
            <span
              className="about-sub-txt"
              onClick={redirectToHomePage}
              style={{
                color: "rgb(57, 138, 192)",
                background: "yellow",
              }}
            >
              Whereshouldigo
            </span>{" "}
            — the smarter way to find your next destination!
          </p>
          <p className="about-sub-txt">
            We understand that planning trips or finding the perfect spot can be
            overwhelming. Endless browsing, reading reviews, and comparing
            options can leave you feeling more confused than inspired. That’s
            why we built{" "}
            <span
              className="about-sub-txt"
              onClick={redirectToHomePage}
              style={{
                color: "rgb(57, 138, 192)",
                background: "yellow",
              }}
            >
              Whereshouldigo
            </span>{" "}
            — to take the stress out of decision-making and make discovering
            amazing destinations quick, easy, and tailored to you.
          </p>
          <p
            className="about-sub-head"
            style={{
              color: "rgb(21, 71, 105)",
              textDecoration: "underline",
            }}
          >
            How It Works
          </p>
          <p className="about-sub-txt" style={{ fontWeight: "lighter" }}>
            Using the power of AI,{" "}
            <span
              className="about-sub-txt"
              onClick={redirectToHomePage}
              style={{
                color: "rgb(57, 138, 192)",
                background: "yellow",
              }}
            >
              Whereshouldigo
            </span>{" "}
            takes your preferences, such as location, interests, and budget, and
            provides highly personalized recommendations in seconds. Our
            technology does the heavy lifting, sifting through countless options
            to deliver suggestions that feel handpicked just for you.
          </p>
          <p
            className="about-sub-head"
            style={{
              color: "rgb(21, 71, 105)",
              textDecoration: "underline",
            }}
          >
            Why We’re Here
          </p>
          <p className="about-sub-txt" style={{ fontWeight: "lighter" }}>
            We believe everyone deserves a seamless and enjoyable planning
            experience. Whether you're planning your next big vacation, a quick
            weekend getaway, or just looking for a local spot to explore,{" "}
            <span
              className="about-sub-txt"
              onClick={redirectToHomePage}
              style={{
                color: "rgb(57, 138, 192)",
                background: "yellow",
              }}
            >
              Whereshouldigo
            </span>{" "}
            saves you time so you can focus on what matters most—making
            memories.
          </p>
          <p
            className="about-sub-head"
            style={{
              color: "rgb(21, 71, 105)",
              textDecoration: "underline",
            }}
          >
            Our Vision
          </p>
          <p className="about-sub-txt" style={{ fontWeight: "lighter" }}>
            This is just the beginning. We’re committed to continuously
            enhancing{" "}
            <span
              className="about-sub-txt"
              onClick={redirectToHomePage}
              style={{
                color: "rgb(57, 138, 192)",
                background: "yellow",
              }}
            >
              Whereshouldigo
            </span>
            , integrating user feedback, and expanding our capabilities. From
            refining recommendations to adding more features like curated
            itineraries or collaboration tools, we’re here to revolutionize the
            way people plan and discover.,
          </p>
          <p
            className="about-sub-txt"
            style={{
              color: "yellow",
              backgroundColor: "rgb(57, 138, 192)",
            }}
          >
            Let’s transform the way you explore the world, one recommendation at
            a time.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
