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
import { AppContext } from ".././context/AppContext";
import ShowFinalInfo from "./tripQuestions/ShowFinalInfo/ShowFinalInfo";
import AdditionalInfo from "./tripQuestions/ExtraInfo/AdditionalInfo";

const TripTailor = () => {
  const [progress, setProgress] = useState(10);
  const [nextPath, setNextPath] = useState("/tripTailor");
  const [page, setPage] = useState(0);
  const [days, setDays] = useState(2);
  const [mnth, setMnth] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState([]);
  const [tripType, setTripType] = useState("");
  const [pets, setPets] = useState(false);
  const [hasFemale, setHasFemale] = useState();
  const [hasKids, setHasKids] = useState();
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [currency, setCurrency] = useState();
  const [modifiedCurrency, setModiefiedCurrency] = useState();
  const [slctdActsSet, setSlctdActsSet] = useState(new Set());
  const [text, setText] = useState("");
  const [states, setStates] = useState();

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
      }}
    >
      <div className="trip-planner">
        <TripPlannerHeader />
        <h9>Page {page}/8</h9>
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
