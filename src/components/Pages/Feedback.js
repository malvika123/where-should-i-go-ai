import { Footer } from "../Footer/Footer";
import TripPlannerHeader from "../Header/TripPlannerHeader";
import { VscFeedback } from "react-icons/vsc";
import { BsSendCheck } from "react-icons/bs";
import "./style/feedback.css";
import { redirectToHomePage } from "../common/navigateTopath";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "./Login/Alert";
import { sanitizeInput } from "../common/utils";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState(false);
  const sendFeedBack = async () => {
    if (feedback) {
      setAlert("Sending feedback...");
      try {
        await axios.post("/api/send/sendFeedback", { data: feedback });
        setError(false);
        setAlert("Feedback recorded");
      } catch (e) {
        setError(true);
        setAlert("Something went wrong");
      }
    } else {
      setError(true);
      setAlert("Please add feedback before shooting");
    }
  };

  useEffect(() => {
    setTimeout(() => setAlert(""), 4000);
  }, [alert]);

  return (
    <div>
      <TripPlannerHeader notshowSubHeader />
      <div className="feedback-header">
        <p className="feedback-txt-head">
          Feedback <VscFeedback />
        </p>
        {alert && <Alert msg={alert} successMsg={error ? null : alert} />}
        <div className="feedback-sub-body">
          <p className="feedback-txt-sb">
            <span className="feedback-txt-sb">
              Your thoughts and suggestions are incredibly important to us!
            </span>
            <br /> At{" "}
            <span
              onClick={redirectToHomePage}
              className="feedback-txt-sb"
              style={{
                color: "rgb(57, 138, 192)",
                background: "yellow",
              }}
            >
              Whereshouldigo
            </span>
            , we’re committed to improving your experience and creating a tool
            that truly meets your needs. Whether you have ideas for new
            features, noticed something we can improve, or just want to share
            your thoughts, we’d love to hear from you. Help us make{" "}
            <span
              onClick={redirectToHomePage}
              className="feedback-txt-sb"
              style={{
                color: "rgb(57, 138, 192)",
                background: "yellow",
              }}
            >
              Whereshouldigo
            </span>
            , even better — because your input drives our innovation. Let’s
            shape the future of exploration together!
          </p>
          <div className="textarea-feedback-div">
            <textarea
              className="textarea-feedback"
              placeholder="Enter your thoughts here..."
              onChange={(e) => setFeedback(sanitizeInput(e.target.value))}
              maxLength={200}
            />
            <p
              className="feedback-txt-sb"
              style={{
                fontWeight: "lighter",
                textAlign: "right",
              }}
            >
              {feedback?.length}/200 max character
            </p>
          </div>

          <br />
          <button className="btn-feedback" onClick={sendFeedBack}>
            Send feedback <BsSendCheck style={{ color: "yellow" }} />
          </button>
        </div>
        <Footer noShowfeedback />
      </div>
    </div>
  );
};

export default Feedback;
