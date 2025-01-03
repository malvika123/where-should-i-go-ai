import { Footer } from "../Footer/Footer";
import TripPlannerHeader from "../Header/TripPlannerHeader";
import "./style/joinus.css";
import { MdOutlineJoinInner } from "react-icons/md";

export const JoinUs = () => {
  return (
    <div className="join-us-head-div">
      <TripPlannerHeader notshowSubHeader />
      <div className="join-us-sub-txt-div">
        <p style={{ color: "rgb(33, 97, 140)" }}>
          Join Us <MdOutlineJoinInner />
          <div style={{ backgroundColor: "gray", height: "1px" }}></div>
        </p>
        <p style={{ fontSize: "20px", marginTop: "2%" }}>
          At Whereshouldigo, we're building a future where finding the perfect
          destination is seamless, personalized, and exciting. But we can’t do
          it alone — we need passionate individuals like you to join us on this
          journey. Whether you’re a tech enthusiast, a creative thinker, or
          someone who loves solving problems, there’s a place for you here.
          Together, we can shape the way people explore and connect with the
          world around them.
        </p>

        <p style={{ fontSize: "25px" }}>Why Join Us?</p>

        <ul style={{ marginBottom: "2%" }}>
          <li>
            <p style={{ fontSize: "20px", marginTop: "2%" }}>
              Be part of an innovative and dynamic team.
            </p>
          </li>
          <li>
            <p style={{ fontSize: "20px", marginTop: "2%" }}>
              Collaborate in an environment that values creativity, growth, and
              diversity.
            </p>
          </li>
        </ul>
        <p style={{ fontSize: "25px" }}>
          Let’s Create Something Amazing Together.
        </p>
        <p style={{ fontSize: "20px", marginTop: "2%" }}>
          Send us your resume at -
          <span
            style={{
              fontSize: "20px",
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
