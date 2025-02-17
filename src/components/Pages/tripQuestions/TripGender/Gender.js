import { useContext, useEffect, useState } from "react";
import "../style/Gender.css";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { AppContext } from "../../../context/AppContext";
import { BiFemale } from "react-icons/bi";
import { FaMale } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";

const Gender = () => {
  const [genderMap, setGenderMap] = useState([
    ["Male", false, "male", <FaMale />],
    ["Female", false, "male", <BiFemale />],
    ["Special", false, "male", <RiUserHeartLine />],
  ]);
  const [showNextButton, setShowNextButton] = useState(false);
  const { setProgress, setNextPath, setPage, gender, setGender } =
    useContext(AppContext);

  const setUserGender = (e, label) => {
    setGender(label);
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
          {genderMap.map(([label, isSelected, value, Icon], index) => (
            <div key={index}>
              {Icon}
              <p className={value} onClick={(e) => setUserGender(e, label)}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={"/userPlace"}
        backPath={"/tripTailor"}
        setProgress={setProgress}
        setProgressVal={36}
        resetProgressVal={24}
      />
    </div>
  );
};

export default Gender;
