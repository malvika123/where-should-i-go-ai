import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { PiCursorClickDuotone } from "react-icons/pi";
import { TiTickOutline } from "react-icons/ti";

import "./style/review.css";
import { useEffect, useState } from "react";
import { GrayAlert, GreenAlert } from "../Login/Alert";
import { validateEmail } from "../../common/utils";

export const TripResponseReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [alert, setAlert] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [email, setEmail] = useState(userInfo ? userInfo?.email : "");
  const handleOnclick = (i) => {
    setRating(i);
    //console.log(email);
    if (email) {
      setAlert(`Review recorded !!!`);
      localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, email }));
    } else {
      setAlert("Please enter valid email");
    }
  };

  useEffect(() => {
    setTimeout(() => setAlert(""), 1000);
  }, [alert]);
  return (
    <div>
      <p className="review-txt">Please review your trip recommendation</p>
      <p className="sub-review-txt">
        Your reviews are valuable to us, they helps us improve your experience
        on our site
      </p>
      {alert && <GrayAlert msg={alert} />}
      {!userInfo?.email && (
        <div style={{ marginBottom: "1%" }}>
          <input
            type="text"
            className="email1"
            placeholder="Enter your email"
            onChange={(e) =>
              validateEmail(e.target.value) ? setEmail(e.target.value) : ""
            }
          />{" "}
          <span
            onClick={() => (window.document.location.href = "/login")}
            style={{ cursor: "pointer" }}
          >
            or click here to login <PiCursorClickDuotone />
          </span>
        </div>
      )}

      <div>
        {(() => {
          const elt = [];
          for (let i = 1; i <= 5; i++) {
            elt.push(
              <FaStar
                className="star-empty"
                id={i}
                color={i <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onClick={() => handleOnclick(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
              />
            );
          }
          return elt;
        })()}
      </div>
      <p className="sub-review-txt-add-review">
        Want to add more or learn what our users say, click here{" "}
        <PiCursorClickDuotone />
      </p>
    </div>
  );
};

export const ItineraryReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [alert, setAlert] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [email, setEmail] = useState(userInfo ? userInfo?.email : "");
  const handleOnclick = (i) => {
    setRating(i);
    if (email) {
      setAlert(`Review recorded !!!`);
      localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, email }));
    } else {
      setAlert("Please enter valid email");
    }
  };

  useEffect(() => {
    setTimeout(() => setAlert(""), 2000);
  }, [alert]);
  return (
    <div>
      <p className="review-txt">Please review your trip itinerary</p>
      <p className="sub-review-txt">
        Your reviews are valuable to us, they helps us improve your experience
        on our site
      </p>
      {alert && <GreenAlert msg={alert} />}
      {!userInfo?.email && (
        <div style={{ marginBottom: "1%" }}>
          <input
            type="text"
            className="email1"
            placeholder="Enter your email"
            onChange={(e) =>
              validateEmail(e.target.value) ? setEmail(e.target.value) : ""
            }
          />{" "}
          <span
            onClick={() => (window.document.location.href = "/login")}
            style={{ cursor: "pointer" }}
          >
            or click here to login <PiCursorClickDuotone />
          </span>
        </div>
      )}

      <div>
        {(() => {
          const elt = [];
          for (let i = 1; i <= 5; i++) {
            elt.push(
              <FaStar
                className="star-empty"
                id={i}
                color={i <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onClick={() => handleOnclick(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
              />
            );
          }
          return elt;
        })()}
      </div>
      <p className="sub-review-txt-add-review">
        Want to add more or learn what our users say, click here{" "}
        <PiCursorClickDuotone />
      </p>
    </div>
  );
};
