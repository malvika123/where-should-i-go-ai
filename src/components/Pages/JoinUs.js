import { Footer } from "../Footer/Footer";
import TripPlannerHeader from "../Header/TripPlannerHeader";
import "./style/joinus.css";
import { MdOutlineJoinInner } from "react-icons/md";

export const JoinUs = () => {
  return (
    <div className="join-us-head-div">
      <TripPlannerHeader notshowSubHeader />
      <div className="join-us-sub-txt-div">
        <p className="joinus-head">
          Join Us <MdOutlineJoinInner />
          <div style={{ backgroundColor: "gray", height: "1px" }}></div>
        </p>
        <p className="joinus-head-txt">
          At Whereshouldigo, we're building a future where finding the perfect
          destination is seamless, personalized, and exciting. But we can’t do
          it alone — we need passionate individuals like you to join us on this
          journey. Whether you’re a tech enthusiast, a creative thinker, or
          someone who loves solving problems, there’s a place for you here.
          Together, we can shape the way people explore and connect with the
          world around them.
        </p>

        <p className="joinus-head-txt-head">Why Join Us?</p>

        <ul style={{ marginBottom: "2%" }}>
          <li>
            <p className="joinus-head-txt">
              Be part of an innovative and dynamic team.
            </p>
          </li>
          <li>
            <p className="joinus-head-txt">
              Collaborate in an environment that values creativity, growth, and
              diversity.
            </p>
          </li>
        </ul>
        <p className="joinus-head-txt-head">
          Let’s Create Something Amazing Together.
        </p>
        <p className="joinus-head-txt">
          Send us your resume at -
          <span
            style={{
              marginTop: "2%",
              color: "rgb(21, 71, 105)",
              backgroundColor: "yellow",
            }}
          >
            team@whereshouldigoai.com
          </span>
          . Reach out anyway — we’d love to hear from you!
        </p>
      </div>
      <Footer />
    </div>
  );
};
