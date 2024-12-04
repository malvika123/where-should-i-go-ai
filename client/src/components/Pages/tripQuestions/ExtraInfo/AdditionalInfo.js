import { useContext, useEffect, useState } from "react";
import "./style/style.css";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { tripRecommendationPath } from "../../../common/constants";

const AdditionalInfo = () => {
  const [char, setChar] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const { setProgress, setNextPath, setPage, setText, text } =
    useContext(AppContext);

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
          placeholder="Addition info here ..."
          onChange={(e) => {
            setChar(e.target.value.length);
            setText(e.target.value);
          }}
          value={text}
          className="textarea"
        ></textarea>
        <div className="textbox-info">
          {char === 50 && (
            <h9 className="char-exceed">Reached character limit</h9>
          )}
          <h9 className="char-info">{char}/50 max characters</h9>
        </div>
      </div>

      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={"/showFinalInfo"}
        setProgress={setProgress}
        backPath={"/tripType"}
        hideNext={false}
        setProgressVal={100}
        resetProgressVal={84}
        className="back-ftr"
      />
    </div>
  );
};

export default AdditionalInfo;
