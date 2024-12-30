import { useContext, useEffect, useState } from "react";
import "./style/TripType.css";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { GoPlus } from "react-icons/go";
import InfoModal from "./ShowModal";
import TripActivities from "./TripActivities";
import { AppContext } from "../../../context/AppContext";

const TripType = () => {
  const tripActivities = [
    "Sea side adventure",
    "Sight-seeing",
    "Cafe Hopping",
    "Museum and Heritage visit",
    "Trekking and Climbing",
    "Air Adventure",
    "Under water Activities",
    "Clubs and Casinos",
    "Malls and Parks",
    "Landmarks",
  ];
  const [showNextButton, setShowNextButton] = useState(false);
  const [showAddInterestModal, setShowAddInterestModal] = useState(false);
  const [defaultTrip, setDefaultTrip] = useState(tripActivities);
  const { setProgress, setNextPath, setPage } = useContext(AppContext);
  const { slctdActsSet } = useContext(AppContext);

  useEffect(() => {
    setPage(6);
  }, []);

  const checkIfSelected = (elt) => {
    const checkIfSelected = Array.from(slctdActsSet).some((sub) => {
      return elt === sub;
    });

    return checkIfSelected;
  };
  return (
    <div>
      <h4>What kind of activities are you interested in</h4>
      <h6 className="sub-hdng">Select all that applies:</h6>
      <div className="trip-act">
        {defaultTrip.map((elt, id) => {
          return (
            <TripActivities
              elt={elt}
              key={id}
              defaultTrip={defaultTrip}
              selected={checkIfSelected(elt)}
            />
          );
        })}
        <p
          className="act-elt-add"
          onClick={() => setShowAddInterestModal((prev) => !prev)}
        >
          <GoPlus className="plus1" />
          Add more
        </p>
      </div>
      {/* <p>{Array.from(slctdActsSet).map((elt) => elt)}</p> */}
      {showAddInterestModal && (
        <InfoModal
          className="modal"
          setShowAddInterestModal={setShowAddInterestModal}
          setDefaultTrip={setDefaultTrip}
        />
      )}
      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={"/expectBox"}
        setProgress={setProgress}
        backPath={"/budget"}
        resetProgressVal={72}
        setProgressVal={84}
      />
    </div>
  );
};

export default TripType;
