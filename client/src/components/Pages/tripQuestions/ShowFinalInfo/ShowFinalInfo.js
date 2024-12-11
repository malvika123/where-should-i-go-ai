import { useNavigate } from "react-router-dom";
import { tripRecommendationPath } from "../../../common/constants";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import "./style/style.css";
import Spinner from "./Spinner";
import axios from "axios";
import { setUserData } from "../../../store/slices/dataSlice";
const ShowFinalInfo = () => {
  const navigate = useNavigate();
  const [showNextButton, setShowNextButton] = useState(false);
  const { setProgress, setNextPath, setPage } = useContext(AppContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [processingData, setProcessData] = useState(false);
  const dispatch = useDispatch();

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
    text,
  } = useContext(AppContext);

  useEffect(() => {
    setPage(8);
  }, []);

  const NavigateTopath = ({ path }) => {
    navigate(path);
  };
  const processData = () => {
    setShowSpinner(true);
    setProcessData(true);
  };

  useEffect(() => {
    if (processingData) {
      try {
        const res = async () => {
          const data = await axios.post(
            "/openapi/getsuggestion",
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
            })
          );
          setShowSpinner(false);
          setProcessData(false);
          NavigateTopath({ path: tripRecommendationPath });
        };
        res();
      } catch (e) {}
    }
  }, [processingData]);

  return (
    <div>
      <h5 className="hding-showInfo">
        Hey! Before you go, check all the info that we have captured !!!
      </h5>
      <div className="div-flex">
        <h6 className="key">Month of travel:</h6>{" "}
        <h6 className="value">{mnth}</h6>
      </div>

      <div className="div-flex">
        <h6 className="key">No. of days of your trip:</h6>{" "}
        <h6 className="value">{days} days</h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Your Gender:</h6>{" "}
        <h6 className="value">{gender}</h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Preferred States:</h6>
        <h6 className="value">
          {selectedStates &&
            Array.from(selectedStates).map((elt) => `${elt}, `)}
        </h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Country of interest</h6>
        <h6 className="value">
          {country.charAt(0).toUpperCase() + country.slice(1)}
        </h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Type of trip</h6>
        <h6 className="value">{tripType}</h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Are you going with pets?</h6>{" "}
        <h6 className="value">{pets ? "Yes" : "No"}</h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Are you kids involved in this trip?</h6>
        <h6 className="value">{hasKids ? "Yes" : "No"}</h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Budgets</h6>
        <h6 className="value">
          {minValue} - {maxValue}{" "}
          {modifiedCurrency ? modifiedCurrency : currency}
        </h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Activities you are interested in:</h6>
        <h6 className="value">
          {Array.from(slctdActsSet).map((elt) => `${elt}, `)}
        </h6>
      </div>

      <div className="div-flex">
        <h6 className="key">Additional information:</h6>
        <h6 className="value" style={{ textDecoration: "italics" }}>
          {text}
        </h6>
      </div>
      <div className="btns">
        <TripPlannerFooter
          showNext={showNextButton}
          setNextPath={setNextPath}
          setProgress={setProgress}
          backPath={"/expectBox"}
          hideNext={true}
          resetProgressVal={84}
          className="back-ftr"
        />
        <button className="sbmt-btn" onClick={() => processData()}>
          Submit
        </button>
      </div>
      {showSpinner && <Spinner />}
    </div>
  );
};

export default ShowFinalInfo;
