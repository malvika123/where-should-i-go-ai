import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";

export const PlacePallet = ({
  area,
  underhyped,
  getItineraryCall,
  selectedPlace,
  setSelectedPlace,
}) => {
  const allPlace = area.concat(underhyped).map((elt) => elt.name);
  const [place, setPlace] = useState(allPlace);
  const [selectedId, setSelectedId] = useState();
  const selectPlace = (e) => {
    console.log("op", e.target.innerHTML, e.target.id);
    const value = e.target.innerHTML;
    const id = e.target.id;
    setSelectedPlace(value);
    setSelectedId(id);
  };

  const clickAction = () => {
    if (selectedPlace) {
      console.log("op", selectedPlace);
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
        {place.map((elt, key) => (
          <p
            id={key}
            className={selectedId == key ? "elt-pallet-selected" : "elt-pallet"}
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
