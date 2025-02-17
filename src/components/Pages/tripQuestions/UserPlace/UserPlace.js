import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import "./style.css";
import axios from "axios";
import AutocompleteBox from "./AutocompleteBox";
import { RiUserLocationFill } from "react-icons/ri";
import DistanceRange from "./DistanceRange";

const UserPlace = () => {
  const {
    setPage,
    setProgress,
    setNextPath,
    userBase,
    setUserBase,
    distanceRange,
    setDistanceRange,
  } = useContext(AppContext);
  const [showNextButton, setShowNextButton] = useState(false);
  const [text, setText] = useState();
  const [predictedText, setPredictedText] = useState([]);

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
        } catch (err) {}
      }, 1000);
    } else {
      setPredictedText([]);
    }
    return () => clearTimeout(delayDebounceFn);
  }, [text]);
  return (
    <div>
      <h1 className="heading-place">
        Please enter your place(your state/locality)?
      </h1>
      <div>
        <div className="place-marker">
          <>
            <FaMagnifyingGlassLocation className="mag-glass" />
            <input
              type="text"
              className="input-place"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Please enter you place here"
            />
          </>
        </div>
        {text && (
          <AutocompleteBox
            predictedText={predictedText}
            setUserBase={setUserBase}
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
        />
      )}

      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={"/country"}
        backPath={"/tripTailor"}
        setProgress={setProgress}
        setProgressVal={36}
        resetProgressVal={24}
      />
    </div>
  );
};

export default UserPlace;
