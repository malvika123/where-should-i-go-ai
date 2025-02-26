import { useContext, useEffect, useState } from "react";
import "./style/style.css";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { tripRecommendationPath } from "../../../common/constants";
import Spinner from "../ShowFinalInfo/Spinner";
import {
  aTknCookie,
  cuidCookie,
  isUserLoggedIn,
  isUserSessionValid,
  ivCookie,
  sanitizeInput,
} from "../../../common/utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../store/slices/dataSlice";

const AdditionalInfo = () => {
  const [char, setChar] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [processingData, setProcessData] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSessionValid, setSessionValid] = useState(false);
  const NavigateTopath = ({ path }) => {
    navigate(path);
  };
  const processData = () => {
    setShowSpinner(true);
    setProcessData(true);
  };
  const { setProgress, setNextPath, setPage, setText, text } =
    useContext(AppContext);
  const {
    days,
    mnth,
    gender,
    selectedStates,
    country,
    tripType,
    pets,
    hasFemale,
    hasKids,
    minValue,
    maxValue,
    currency,
    modifiedCurrency,
    slctdActsSet,
    distanceRange,
    userBase,
    isRangeSelected,
  } = useContext(AppContext);

  sessionStorage.setItem(
    "collectedInfo",
    JSON.stringify({
      days,
      mnth,
      gender,
      selectedStates: `${Array.from(selectedStates || []).map(
        (elt) => `${elt}, `
      )}`,
      country,
      tripType,
      pets,
      hasFemale,
      hasKids,
      minValue,
      maxValue,
      currency,
      modifiedCurrency,
      slctdActsSet: `${Array.from(slctdActsSet).map((elt) => `${elt}, `)}`,
      text,
      distanceRange,
      userBase,
      isRangeSelected,
    })
  );
  useEffect(() => {
    setPage(8);
    setSessionValid(isUserSessionValid());
  }, []);

  const skippedLogin = sessionStorage.getItem("skippedLogin");
  const isLoginSkipped = () => {
    const timeNow = Math.floor(Date.now() / 1000);
    if (skippedLogin > timeNow) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (processingData) {
      if (!isLoginSkipped() && !isUserLoggedIn()) {
        window.location.href = "/login?unauthorised=true&from=tripTailor";
      } else {
        const token = aTknCookie();
        const id = cuidCookie();
        const iv = ivCookie();
        //console.log("opopopopo");
        const res = async () => {
          try {
            const data = await axios.post(
              "/api/openapi/getsuggestion",
              {
                days,
                mnth,
                gender,
                selectedStates: `${Array.from(selectedStates || []).map(
                  (elt) => `${elt}, `
                )}`,
                country,
                tripType,
                pets,
                hasFemale,
                hasKids,
                minValue,
                maxValue,
                currency,
                modifiedCurrency,
                slctdActsSet: `${Array.from(slctdActsSet).map(
                  (elt) => `${elt}, `
                )}`,
                text,
                token,
                id,
                iv,
                userBase,
                distanceRange,
                range: isRangeSelected,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            dispatch(
              setUserData({
                state: data?.data?.jsonObj?.state,
                reasonForStateChoice: data?.data?.jsonObj?.reason,
                area: data?.data?.jsonObj?.["places_to_visit"],
                underhyped: data?.data?.jsonObj?.["off_beat_places"],
                note: data?.data?.jsonObj?.["precautions"],
                avoidPlaces: data?.data?.jsonObj?.["places_to_avoid"],
                days,
                mnth,
                gender,
                selectedStates,
                country,
                tripType,
                pets,
                hasFemale,
                hasKids,
                minValue,
                maxValue,
                currency,
                modifiedCurrency,
                slctdActsSet,
                text,
                recomm: `${JSON.stringify(data?.data?.jsonObj)}`,
                userBase,
                distanceRange,
                isRangeSelected,
              })
            );
            setShowSpinner(false);
            setProcessData(false);

            NavigateTopath({ path: tripRecommendationPath });
          } catch (e) {
            //console.log("uiui", e);
            setProcessData(false);
            const errData = e?.response?.data;
            if (!errData?.authenticated) {
              window.location.href = "/login?unauthorised=true&from=tripTailor";
              return;
            } else if (!errData.tokenCountSufficient) {
              window.location.href = "/tripRecommendation";
              return;
            }
          }
        };
      }
      res();
    }
  }, [processingData]);
  return (
    <div className="top-hdr-tp">
      <h5>
        Please write a short note telling us what more are you expecting from
        this Trip.
      </h5>
      <h6>Jot down your idea below</h6>
      <div className="text-box">
        <textarea
          maxLength={150}
          placeholder="Addition info here ..."
          onChange={(e) => {
            setChar(e.target.value.length);
            setText(sanitizeInput(e.target.value));
          }}
          value={text}
          className="textarea"
        ></textarea>
        <div className="textbox-info">
          {char === 150 && (
            <h9 className="char-exceed">Reached character limit</h9>
          )}
          <h9 className="char-info">{char}/150 max characters</h9>
        </div>
      </div>
      <div className="btns">
        <TripPlannerFooter
          showNext={showNextButton}
          setNextPath={setNextPath}
          setProgress={setProgress}
          backPath={"/tripType"}
          hideNext={true}
          resetProgressVal={87.5}
          className="back-ftr"
          setProgressVal={100}
        />
        <button className="sbmt-btn" onClick={() => processData()}>
          Submit
        </button>
      </div>
      {showSpinner && <Spinner />}
    </div>
  );
};

export default AdditionalInfo;
