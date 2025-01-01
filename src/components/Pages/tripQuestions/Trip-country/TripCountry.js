import { FaMagnifyingGlass } from "react-icons/fa6";
import "../style/TripCountry.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SelectedState from "./SelectedState";
import { enableAutoComplete } from "../../../Featureflags";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { AppContext } from "../../../context/AppContext";
import Spinner from "../ShowFinalInfo/Spinner";
import CommonSpinner from "../../../common/CommonSpinner";

const TripCountry = () => {
  const [countryList, setCountryList] = useState("");
  const [err, setErr] = useState("");
  const [state, setState] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const {
    setProgress,
    setNextPath,
    setPage,
    country,
    setCountry,
    selectedStates,
    setSelectedStates,
    states,
    setStates,
  } = useContext(AppContext);

  const autocmpltFeatureFlg = enableAutoComplete;

  useEffect(() => {
    setPage(3);
    setShowNextButton(false);
  }, []);

  // Handle input change and update the country state immediately
  useEffect(() => {
    if (autocmpltFeatureFlg) {
      const debounce = setTimeout(async () => {
        try {
          const data = await fetch("/loc/authz");
          if (data.status !== 200) throw data;
          const res = await data.json();
          const countryData = await axios.post(
            "/api/loc/country",
            {
              authz: res,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const countries = countryData.data;
          setCountryList(countries);
        } catch (error) {
          setErr("internal server error");
        }
      }, 1000);
      return () => clearTimeout(debounce);
    }
  }, []);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const handleStateClicked = (e) => {
    const selectedState = e.currentTarget.innerText;
    if (selectedStates?.length >= 7 || selectedStates?.size >= 7) {
      setErr("Only 6 state selection allowed");
    } else {
      setState(selectedState);
    }
  };
  // Debounced API call inside useEffect

  useEffect(() => {
    if (state) {
      const nuArr = new Set(selectedStates);
      nuArr.add(state);
      setSelectedStates(nuArr);
    }
  }, [state]);

  useEffect(() => {
    setTimeout(() => setErr(""), 5000);
  }, [err]);

  useEffect(() => {
    let delayDebounceFn;
    if (country) {
      const filterList =
        countryList &&
        countryList.filter((elt, id) => elt.toLowerCase().startsWith(country));
      setAutoComplete(filterList.slice(0, 4));
      delayDebounceFn = setTimeout(async () => {
        try {
          const data = await fetch("/loc/authz");
          if (data.status !== 200) throw data;
          const res = await data.json();
          const stateData = await axios.post(
            "/api/loc/getState",
            {
              country: country,
              authz: res,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (stateData.data.length <= 0)
            setErr("Please enter a valid country");
          setStates(stateData.data);
        } catch (error) {
          setErr("Try typing the country again");
        }
      }, 1000); // Delay for 1 second
    } else {
      setSelectedStates();
      setStates();
      setState();
    }
    // Cleanup the timeout if country changes within the delay period
    return () => clearTimeout(delayDebounceFn);
  }, [country]);

  return (
    <div className="">
      <h4>Enter your country of interest</h4>
      <h5 className="sub-txt">Enter the country you would like to visit</h5>
      {err && <h6 className="error">{err}</h6>}

      <div className="search">
        <FaMagnifyingGlass className="glass" />
        <input
          className="textbox"
          value={country}
          onChange={handleChange}
          type="text"
          placeholder="Type your country here"
        />
      </div>
      {autocmpltFeatureFlg && (
        <div className="autocomlt">
          {country &&
            autoComplete &&
            autoComplete.map((elt, id) => <p className="auto-lst">{elt}</p>)}
        </div>
      )}
      {country && !(states && states.length > 0) && (
        <CommonSpinner color={"orange"} />
      )}
      {country && states && states.length > 0 && (
        <h5 style={{ marginTop: "5%" }}>
          Please select any six states of your interest:{" "}
        </h5>
      )}
      <div className="state-brd">
        {states &&
          states.map((elt, index) => (
            <p key={index} className="state" onClick={handleStateClicked}>
              {elt}
            </p>
          ))}
      </div>

      {states && selectedStates && (
        <div className="tag-box">
          {Array.from(selectedStates).map((elt, id) => {
            return (
              <SelectedState
                id={id}
                state={elt}
                setSelectedStates={setSelectedStates}
                selectedStates={selectedStates}
              />
            );
          })}
        </div>
      )}
      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={"/tripInfo"}
        setProgress={setProgress}
        backPath={"/gender"}
        setProgressVal={48}
        resetProgressVal={36}
      />
    </div>
  );
};
export default TripCountry;
