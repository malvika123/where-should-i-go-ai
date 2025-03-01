import {
  navigateToDeleteAccountpath,
  redirectToAboutPage,
  redirectToArticlesPage,
  redirectToFAQPage,
  redirectToFeedbackPage,
  redirectToJoinUsPage,
  redirectToPrivacyPolicyPage,
} from "../common/navigateTopath";
import "./style/footer.css";
import { SocialIcon } from "react-social-icons";

export const Footer = ({ noShowfeedback }) => {
  return (
    <div className="back-footer">
      {!noShowfeedback && (
        <div className="top-hdr">
          <h4 className="text-sb-footer">We’d love to hear what you think!</h4>
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
        <span className="links-footer" onClick={navigateToDeleteAccountpath}>
          delete account
        </span>
        <span className="links-footer">|</span>
        <span className="links-footer" onClick={redirectToPrivacyPolicyPage}>
          Privacy Policy
        </span>
        <span className="links-footer">|</span>
        <span className="links-footer" onClick={redirectToFAQPage}>
          FAQ
        </span>
        <span className="links-footer">|</span>
        <span className="links-footer" onClick={redirectToArticlesPage}>
          Travel Articles
        </span>
      </div>
      <div>
        <p className="info-txt-ftr">
          At Where Should I Go, we blend the power of AI with a passion for
          travel to create personalized recommendations that save you time and
          make every journey unforgettable. Our mission is to help you explore
          the world effortlessly, guided by your unique preferences and
          interests. We value innovation, trust, and customer satisfaction,
          striving to inspire wanderlust while ensuring your experience is
          seamless and stress-free. Your next adventure starts here—let us guide
          the way!
        </p>
      </div>
      <div
        style={{
          margin: "10px 10px 10px 10px",
        }}
      >
        <SocialIcon
          className="social-media-icons"
          url="https://x.com/wershouldigoai"
        />
        <SocialIcon
          className="social-media-icons"
          url="https://www.facebook.com/profile.php?id=61571602116409"
        />

        <SocialIcon
          className="social-media-icons"
          url="https://www.instagram.com/whereshouldigoai/"
        />
        <SocialIcon
          className="social-media-icons"
          url="https://www.reddit.com/user/EquivalentSolid6954/"
        />
      </div>
      <div>
        <h8
          style={{
            color: "black",
            margin: "10px 10px 30px 10px",
            fontSize: "10px",
          }}
        >
          © 2025 PrismaCorp. All Rights Reserved.
        </h8>
      </div>
    </div>
  );
};
