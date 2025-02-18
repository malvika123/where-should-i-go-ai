import { useState } from "react";

const DistanceRange = ({ setDistanceRange, distanceRange }) => {
  const [isRangeSelected, setRangeSelected] = useState();
  const [selectedOptionTarget, setSelectedOptionTarget] = useState();

  const selectedOption = (val, e) => {
    console.log(e);
    e.target.classList.add("option-checked");
    selectedOptionTarget &&
      selectedOptionTarget.classList.remove("option-checked");
    setSelectedOptionTarget(e.target);
    setRangeSelected(val);
  };
  return (
    <div>
      <div>
        <h1 className="heading-place">
          Do you have a specific distance range in mind for your travel plans?{" "}
        </h1>
        <div className="travel-range-option">
          <p className="range-optn" onClick={(e) => selectedOption(true, e)}>
            Yes, i do
          </p>
          <p className="range-optn" onClick={(e) => selectedOption(false, e)}>
            Nope, i'm good
          </p>
        </div>
      </div>
      {isRangeSelected && (
        <div>
          {" "}
          <h1 className="heading-place">Please enter the range ?</h1>
          <p className="place-dist">
            {distanceRange} <span style={{ color: "orange" }}>KMs</span>
          </p>
          <input
            type="range"
            min="10"
            max="1000"
            value={distanceRange}
            onChange={(e) => {
              setDistanceRange(e.target.value);
            }}
            className="place-input-range"
          />
        </div>
      )}
    </div>
  );
};

export default DistanceRange;
