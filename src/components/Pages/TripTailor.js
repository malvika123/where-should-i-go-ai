import TripPlannerHeader from "../Header/TripPlannerHeader";
import Progress from "rsuite/Progress";
import "rsuite/dist/rsuite.min.css";
import "./style/TripTailor.css";
import { useEffect, useState } from "react";
import TripMonth from "./tripQuestions/TripMonth/TripMonth";
import Gender from "./tripQuestions/TripGender/Gender";
import TripCountry from "./tripQuestions/Trip-country/TripCountry";
import TripInfo from "./tripQuestions/TripTravelerInfo/TripInfo";
import Budget from "./tripQuestions/TripBudget/Budget";
import TripType from "./tripQuestions/TripActivityType/TripType";
import { AppContext } from "../context/AppContext";
import ShowFinalInfo from "./tripQuestions/ShowFinalInfo/ShowFinalInfo";
import AdditionalInfo from "./tripQuestions/ExtraInfo/AdditionalInfo";
import UserPlace from "./tripQuestions/UserPlace/UserPlace";

const TripTailor = () => {
  const userInfoCollected = JSON.parse(localStorage.getItem("collectedInfo"));
  const {
    days: day,
    mnth: month,
    gender: gen,
    selectedStates: selState,
    country: cntry,
    tripType: trpType,
    pets: pts,
    hasFemale: female,
    hasKids: kids,
    minValue: minVal,
    maxValue: maxVal,
    currency: cur,
    modifiedCurrency: modCur,
    slctdActsSet: sltActs,
    text: txt,
    userBase: usrBase,
    distanceRange: dstRange,
  } = userInfoCollected || {};

  const [progress, setProgress] = useState(10);
  const [nextPath, setNextPath] = useState("/tripTailor");
  const [page, setPage] = useState(0);
  const [days, setDays] = useState(day || 2);
  const [mnth, setMnth] = useState(month || "");
  const [gender, setGender] = useState(gen || "");
  const [country, setCountry] = useState(cntry || "");
  const [selectedStates, setSelectedStates] = useState([]);
  const [tripType, setTripType] = useState(trpType || "");
  const [pets, setPets] = useState(pts || false);
  const [hasFemale, setHasFemale] = useState(female || null);
  const [hasKids, setHasKids] = useState(kids || null);
  const [minValue, setMinValue] = useState(minVal || null);
  const [maxValue, setMaxValue] = useState(maxVal || null);
  const [currency, setCurrency] = useState(cur || null);
  const [modifiedCurrency, setModiefiedCurrency] = useState(modCur || null);
  const [slctdActsSet, setSlctdActsSet] = useState(
    (sltActs?.length > 0 && Object.values(sltActs?.split(",") || [])) ||
      new Set()
  );
  const [text, setText] = useState(txt || "");
  const [states, setStates] = useState();
  const [userBase, setUserBase] = useState(usrBase || null);
  const [distanceRange, setDistanceRange] = useState(dstRange || 10);

  return (
    <AppContext.Provider
      value={{
        progress,
        setProgress,
        nextPath,
        setNextPath,
        page,
        setPage,
        days,
        setDays,
        mnth,
        setMnth,
        gender,
        setGender,
        country,
        setCountry,
        selectedStates,
        setSelectedStates,
        tripType,
        setTripType,
        pets,
        setPets,
        hasFemale,
        setHasFemale,
        hasKids,
        setHasKids,
        minValue,
        setMinValue,
        maxValue,
        setMaxValue,
        currency,
        setCurrency,
        modifiedCurrency,
        setModiefiedCurrency,
        slctdActsSet,
        setSlctdActsSet,
        text,
        setText,
        states,
        setStates,
        userBase,
        setUserBase,
        distanceRange,
        setDistanceRange,
      }}
    >
      <div className="trip-planner">
        <TripPlannerHeader />
        <h9>Page {page}/7</h9>
        <div className="box">
          <Progress.Line
            percent={progress}
            status="active"
            strokeColor="#000000"
            showInfo={false}
          />
          <div>
            {nextPath === "/tripTailor" ? (
              <TripMonth />
            ) : nextPath === "/gender" ? (
              <Gender />
            ) : nextPath === "/userPlace" ? (
              <UserPlace />
            ) : nextPath === "/country" ? (
              <TripCountry />
            ) : nextPath === "/tripInfo" ? (
              <TripInfo />
            ) : nextPath === "/budget" ? (
              <Budget />
            ) : nextPath === "/tripType" ? (
              <TripType />
            ) : nextPath === "/expectBox" ? (
              <AdditionalInfo />
            ) : nextPath === "/showFinalInfo" ? (
              <ShowFinalInfo />
            ) : null}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default TripTailor;
