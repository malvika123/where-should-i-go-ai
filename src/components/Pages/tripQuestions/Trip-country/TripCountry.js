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
import { sanitizeInput } from "../../../common/utils";

const TripCountry = () => {
  const [countryList, setCountryList] = useState("");
  const [err, setErr] = useState("");
  const [state, setState] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [searchingCountry, setSearchingCountry] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [searchedState, setSearchedState] = useState("");
  const [searchedStateList, setSearchedStateList] = useState([]);
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

  useEffect(() => {
    const statesSearched = states && states?.filter((elt, index) =>
      elt.toLowerCase().includes(searchedState?.toLowerCase()))
    setSearchedStateList(statesSearched);
  }
    , [searchedState]);

  const autocmpltFeatureFlg = enableAutoComplete;

  useEffect(() => {
    setPage(4);
    setShowNextButton(false);
  }, []);

  // Handle input change and update the country state immediately
  useEffect(() => {
    if (autocmpltFeatureFlg) {
      const debounce = setTimeout(async () => {
        try {

          const countryData = await axios.get(
            `/api/loc/countryAutoComplete?val=${country}`,

            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setSearchingCountry(false);
          const countries = countryData.data;
          setCountryList(countries);
          setAutoComplete(countries);
        } catch (error) {
          setErr("internal server error");
        }
      }, 1000);
      setSearchingCountry(true);
      return () => clearTimeout(debounce);
    }
  }, [country]);

  const handleChange = (e) => {
    setCountry(sanitizeInput(e.target.value));
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

      delayDebounceFn = setTimeout(async () => {
        try {
          const getStatev1 = false;
          if (getStatev1) {
            const data = await fetch("/api/loc/authz");
            if (data.status !== 200) throw data;
            const res = await data.json();
          }

          const stateData = await axios.post(
            "/api/loc/getState",
            {
              country: country,
              authz: getStatev1 ? res : "",
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
          setShowAutoComplete(false);
        } catch (error) {
          setErr("Try typing the country again");
        }
      }, 1000); // Delay for 1 second
    } else {
      setSelectedStates();
      setStates();
      setState();
      setSearchedState();
    }
    // Cleanup the timeout if country changes within the delay period
    setAutoComplete([]);
    return () => clearTimeout(delayDebounceFn);
  }, [country]);

  return (
    <div className="">
      <h4>Enter your country of interest</h4>
      <h5 className="sub-txt">Enter the country you would like to visit</h5>
      {err && <h6 className="error">{err}</h6>}

      <div className="searchbox1"
      >
        <div className="search">
          <FaMagnifyingGlass className="glass" />
          <input
            className="textbox"
            value={country}
            onChange={handleChange}
            type="text"
            onClick={() => setShowAutoComplete(true)}
            placeholder="Type your country here"
          />
        </div>
        {autoComplete && !states && <div className="search1">
          {searchingCountry && country ? <div className="autocomlt">
            <CommonSpinner color={"gray"} width="20" />
          </div> : autocmpltFeatureFlg && (
            <div className="autocomlt">
              {country &&
                autoComplete &&
                autoComplete.map((elt, id) => <p className="auto-lst" onClick={(e) => { setCountry(e.target.innerText); setAutoComplete([]) }}>{elt}</p>)}
            </div>
          )}
        </div>}

      </div>
      {country && !(states && states.length > 0) && (
        <CommonSpinner color={"orange"} />
      )}
      {country && states && states.length > 0 && (
        <h5 style={{ marginTop: "5%" }}>
          Please select any six states of your interest:{" "}
        </h5>
      )}
      {states && <input type="text" placeholder="Search a state" className="findState" onChange={(e) => setSearchedState(e.target.value)}
      />}
      <div className="state-brd">
        {searchedState ? searchedStateList &&
          searchedStateList.map((elt, index) => (

            <p key={index} className="state" onClick={handleStateClicked}>
              {elt}
            </p>


          )) : states &&
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
        backPath={"/userPlace"}
        setProgressVal={62.5}
        resetProgressVal={37.5}
      />
    </div>
  );
};
export default TripCountry;
