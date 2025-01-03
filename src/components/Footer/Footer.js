import { landingPageHeader, POWEREDBYAI } from "../common/constants";
import {
  redirectToAboutPage,
  redirectToDeleteAccountPage,
  redirectToFeedbackPage,
  redirectToJoinUsPage,
} from "../common/navigateTopath";
import Logo from "../Header/Logo";
import "./style/footer.css";
import { SocialIcon } from "react-social-icons";

export const Footer = ({ noShowfeedback }) => {
  return (
    <div className="back-footer">
      <div className="top-hdr">
        {!noShowfeedback && (
          <div style={{ backgroundColor: "lightblue", padding: "10px" }}>
            <h4>We’d love to hear what you think!</h4>
            <button
              style={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bolder",
                margin: "auto",
                border: "black 1px",
              }}
              onClick={redirectToFeedbackPage}
            >
              Give feedback
            </button>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            color: "black",
            margin: "20px 10px 10px 5px",
          }}
        >
          <span className="links-footer" onClick={() => redirectToAboutPage()}>
            about
          </span>
          <span className="links-footer">|</span>
          <span className="links-footer" onClick={redirectToJoinUsPage}>
            join us
          </span>
          <span className="links-footer">|</span>
          <span className="links-footer" onClick={redirectToDeleteAccountPage}>
            delete account
          </span>
        </div>
        <div>
          <span
            style={{
              fontSize: "15px",
              marginRight: "40px",
            }}
          >
            At Where Should I Go, we blend the power of AI with a passion for
            travel to create personalized recommendations that save you time and
            make every journey unforgettable. Our mission is to help you explore
            the world effortlessly, guided by your unique preferences and
            interests. We value innovation, trust, and customer satisfaction,
            striving to inspire wanderlust while ensuring your experience is
            seamless and stress-free. Your next adventure starts here—let us
            guide the way!
          </span>
        </div>
        <div
          style={{
            margin: "10px 10px 10px 10px",
          }}
        >
          <SocialIcon
            className="social-media-icons"
            url="https://twitter.com"
          />
          <SocialIcon
            className="social-media-icons"
            url="https://facebook.com"
          />
          <SocialIcon
            className="social-media-icons"
            url="https://instagram.com"
          />
          <SocialIcon className="social-media-icons" url="https://reddit.com" />
        </div>
        <div>
          <h8
            style={{
              color: "black",
              margin: "10px 10px 30px 10px",
              fontSize: "10px",
            }}
          >
            © 2024 PrismaCorp. All Rights Reserved.
          </h8>
        </div>
      </div>
    </div>
  );
};
