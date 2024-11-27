import { useContext, useEffect, useState } from "react";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import Pets from "./Pets";
import Type from "./Type";
import { AppContext } from "../../../context/AppContext";

const TripInfo = () => {
  const [showNextButton, setShowNextButton] = useState(false);
  const { setProgress, setNextPath, setPage } = useContext(AppContext);

  useEffect(() => {
    setPage(4);
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
        backPath={"/country"}
        setProgressVal={70}
        resetProgressVal={56}
      />
    </div>
  );
};

export default TripInfo;
