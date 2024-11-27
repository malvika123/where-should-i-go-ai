import { useContext, useEffect, useState } from "react";
import "./style/style.css";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { tripRecommendationPath } from "../../../common/constants";

const Expectation = () => {
  const [char, setChar] = useState(0);
  const [text, setText] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const {
    setProgress,
    setNextPath,
    setPage,
    days,
    mnth,
    gender,
    states,
    country,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const NavigateTopath = ({ path }) => {
    console.log(path);
    navigate(path);
  };
  const processData = () => {
    console.log("data received:", days, mnth, gender, states, country);
    NavigateTopath({ path: tripRecommendationPath });
  };

  useEffect(() => {
    setPage(7);
  }, []);

  return (
    <div className="top-hdr">
      <h5>
        Please write a short note telling us what more are you expecting from
        this Trip.
      </h5>
      <h6>Jot down your idea below</h6>
      <div className="text-box">
        <textarea
          maxLength={50}
          placeholder="Write what is in your mind"
          onChange={(e) => {
            setChar(e.target.value.length);
            setText(e.target.value);
          }}
          className="textarea"
        ></textarea>
        <div className="textbox-info">
          {char === 50 && (
            <h9 className="char-exceed">Reached character limit</h9>
          )}
          <h9 className="char-info">{char}/50 max characters</h9>
        </div>
      </div>
      <div className="btns">
        <TripPlannerFooter
          showNext={showNextButton}
          setNextPath={setNextPath}
          nextPath={"/tripInfo"}
          setProgress={setProgress}
          backPath={"/tripType"}
          hideNext={true}
          setProgressVal={100}
          resetProgressVal={84}
          className="back-ftr"
        />
        <button className="sbmt-btn" onClick={() => processData()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Expectation;
