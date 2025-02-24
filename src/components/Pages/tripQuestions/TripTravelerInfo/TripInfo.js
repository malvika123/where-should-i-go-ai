import { useContext, useEffect, useState } from "react";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import Pets from "./Pets";
import Type from "./Type";
import { AppContext } from "../../../context/AppContext";

const TripInfo = () => {
  const [showNextButton, setShowNextButton] = useState(false);
  const { setProgress, setNextPath, setPage, isRangeSelected } =
    useContext(AppContext);

  useEffect(() => {
    setPage(5);
  }, []);
  return (
    <div>
      <Pets />
      <Type />
      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={"/budget"}
        setProgress={setProgress}
        backPath={isRangeSelected ? "/userPlace" : "/country"}
        setProgressVal={75}
        resetProgressVal={50}
      />
    </div>
  );
};

export default TripInfo;
