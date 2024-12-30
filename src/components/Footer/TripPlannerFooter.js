import { useNavigate } from "react-router-dom";
import { BACK, NEXT } from "../common/constants";
import "./style/TripPlannerFooter.css";
import { useEffect, useState } from "react";

const TripPlannerFooter = ({
  showNext = false,
  setNextPath,
  hideBack,
  nextPath,
  setProgress,
  setProgressVal,
  backPath = "/tripTailor",
  hideNext = false,
  resetProgressVal,
}) => {
  const [styleNext, setStyleNext] = useState("next");
  const [styleBack, setStyleBack] = useState("back");
  const backButton = () => {
    setNextPath(backPath);
    setProgress(resetProgressVal);
  };

  const goForward = () => {
    setNextPath(nextPath);
    setProgress(setProgressVal);
  };

  useState(() => {
    if (showNext) {
      setStyleNext("next");
    } else {
      setStyleNext("next");
    }
  }, [showNext]);

  useState(() => {
    if (hideBack) {
      setStyleBack((prev) => prev + " hide-back");
    } else {
      setStyleNext("back");
    }
  }, [hideNext]);

  return (
    <div className="footer-top">
      {
        <h3 className={styleBack} onClick={backButton}>
          {BACK}
        </h3>
      }
      {!hideNext && (
        <h3 className="next" disabled={false} onClick={goForward}>
          {NEXT}
        </h3>
      )}
    </div>
  );
};

export default TripPlannerFooter;
