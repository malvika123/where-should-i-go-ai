import { useEffect, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { isUserLoggedIn } from "../../../common/utils";

export const PlacePallet = ({
  area,
  underhyped,
  getItineraryCall,
  selectedPlace,
  setSelectedPlace,
  setItineraryObjData,
  setSpinning,
  spinning,
}) => {
  const allPlace = area?.concat(underhyped)?.map((elt) => elt.name);
  const [place, setPlace] = useState(allPlace);
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {}, [selectedId]);

  const selectPlace = (e) => {
    const value = e.target.innerHTML;
    const id = e.target.id;
    let selArr = new Set();
    let arr = new Set();
    if (Array.from(selectedPlace).some((elt) => elt === value)) {
      selArr = new Set(
        Array.from(selectedPlace).filter((elt) => elt !== value)
      );
    } else {
      selArr = selectedId ? new Set(selectedPlace) : new Set();
      selArr.add(value);
    }
    setSelectedPlace(selArr);
    if (Array.from(selectedPlace).some((elt) => elt === value)) {
      arr = new Set(Array.from(selectedId).filter((elt) => elt !== id));
    } else {
      arr = selectedId ? new Set(selectedId) : new Set();
      arr.add(id);
    }
    setSelectedId(arr);
  };

  const skippedLogin = sessionStorage.getItem("skippedLogin");
  const isLoginSkipped = () => {
    const timeNow = Math.floor(Date.now() / 1000)?.toString();
    if (skippedLogin > timeNow) {
      return true;
    }
    return false;
  };

  if (!isLoginSkipped() && !isUserLoggedIn()) {
    window.location.href = "/login?unauthorised=true&from=tripTailor";
  }
  const clickAction = () => {
    if (selectedPlace) {
      setSpinning(true);

      getItineraryCall();
    }
  };
  return (
    <div className="pallet-div">
      <h3>
        Select the place you are most interested in{" "}
        <FcLikePlaceholder className="icons-itnry" />
      </h3>
      <h5>Please select which applies</h5>
      <div className="pallet-sub">
        {place &&
          place.map((elt, key) => (
            <p
              id={key}
              className={
                Array.from(selectedId).find(
                  (elt) => elt.toString() === key.toString()
                )
                  ? "elt-pallet-selected"
                  : "elt-pallet"
              }
              onClick={selectPlace}
            >
              {elt}
            </p>
          ))}
      </div>
      <button className="continue-btn" onClick={() => clickAction(true)}>
        Continue
      </button>
    </div>
  );
};
