import { useContext, useEffect, useState } from "react";
import "../style/Gender.css";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { AppContext } from "../../../context/AppContext";

const Gender = () => {
  const [genderMap, setGenderMap] = useState([
    ["Male", false, "male"],
    ["Female", false, "male"],
    ["Special", false, "male"],
  ]);
  const [showNextButton, setShowNextButton] = useState(false);
  const { setProgress, setNextPath, setPage, gender, setGender } =
    useContext(AppContext);

  const setUserGender = (e, elt) => {
    setGender(elt[0]);
    setShowNextButton(true);
    setProgress(30);
  };

  useEffect(() => {
    setShowNextButton(true);
  }, [gender]);

  useEffect(() => {
    setPage(2);
    setShowNextButton(false);
  }, []);

  useEffect(() => {
    const newGenderMap = genderMap.map((elt) => {
      const arr = [];
      arr.push(elt[0]);
      if (elt[0] === gender) {
        arr.push(true);
        arr.push("male" + " onClick");
        return arr;
      }
      arr.push(false);
      arr.push("male");

      return arr;
    });
    setGenderMap(newGenderMap);
  }, [gender]);
  return (
    <div>
      <div className="gndr">
        <h5>How do you identify yourself?</h5>
        <div className="gndr-iden">
          {genderMap.map((elt, i) => (
            <p className={elt[2]} onClick={(e) => setUserGender(e, elt)}>
              {elt[0]}
            </p>
          ))}
        </div>
      </div>
      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={"/country"}
        backPath={"/tripTailor"}
        setProgress={setProgress}
        setProgressVal={36}
        resetProgressVal={24}
      />
    </div>
  );
};

export default Gender;
