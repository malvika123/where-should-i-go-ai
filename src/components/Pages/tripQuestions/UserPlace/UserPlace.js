import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import "./style.css";
import axios from "axios";
import AutocompleteBox from "./AutocompleteBox";
import { RiUserLocationFill } from "react-icons/ri";
import DistanceRange from "./DistanceRange";
import { sanitizeInput } from "../../../common/utils";

const UserPlace = () => {
  const {
    setPage,
    setProgress,
    setNextPath,
    userBase,
    setUserBase,
    distanceRange,
    setDistanceRange,
    isRangeSelected,
    setRangeSelected,
  } = useContext(AppContext);
  const [showNextButton, setShowNextButton] = useState(false);
  const [text, setText] = useState();
  const [predictedText, setPredictedText] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setPage(3);
  }, []);

  useEffect(() => {
    setText("");
    setPredictedText([]);
  }, [userBase]);

  useEffect(() => {
    let delayDebounceFn;
    if (text) {
      delayDebounceFn = setTimeout(async () => {
        try {
          const data = await axios.post("/api/loc/autocomplete", {
            place: text,
          });
          console.log(data?.data);
          setPredictedText(data?.data);
          setLoading(false);
        } catch (err) {}
      }, 1000);
    } else {
      setPredictedText([]);
    }
    return () => clearTimeout(delayDebounceFn);
  }, [text]);
  return (
    <div>
      <p className="heading-place">Where are you situated right now?</p>
      <p className="sub-heading-place">please enter your current location</p>
      <div>
        <div className="place-marker">
          <>
            <FaMagnifyingGlassLocation className="mag-glass" />
            <input
              type="text"
              className="input-place"
              value={text}
              onChange={(e) => {
                setText(sanitizeInput(e.target.value));
                setLoading(true);
              }}
              placeholder="Please enter your place here"
            />
          </>
        </div>
        {text && (
          <AutocompleteBox
            predictedText={predictedText}
            setUserBase={setUserBase}
            loading={loading}
          />
        )}
      </div>
      {userBase && (
        <div className="place-val">
          <RiUserLocationFill className="location-icn" />
          <p className="place-name">{userBase}</p>
        </div>
      )}

      {userBase && (
        <DistanceRange
          setDistanceRange={setDistanceRange}
          distanceRange={distanceRange}
          isRangeSelected={isRangeSelected}
          setRangeSelected={setRangeSelected}
        />
      )}

      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={isRangeSelected ? "/tripInfo" : "/country"}
        backPath={"/gender"}
        setProgress={setProgress}
        setProgressVal={50}
        resetProgressVal={25}
      />
    </div>
  );
};

export default UserPlace;
