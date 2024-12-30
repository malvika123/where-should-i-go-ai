import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const TripActivities = ({ elt, key, selected }) => {
  const { slctdActsSet, setSlctdActsSet } = useContext(AppContext);
  const [slctedAct, setSlctdActs] = useState("");
  const updateSlectedActivities = (e) => {
    const text = e.currentTarget.innerText;
    setSlctdActs(text);
    if (e.currentTarget.className.includes("selected")) {
      e.currentTarget.className = "act-elt";
      const nuArr = new Set(slctdActsSet);
      nuArr.delete(slctedAct);
      setSlctdActsSet(nuArr);
    } else {
      e.currentTarget.className += " selected";
      const nuArr = new Set(slctdActsSet);
      nuArr.add(slctedAct);
      setSlctdActsSet(nuArr);
    }
  };

  useEffect(() => {
    const nuArr = new Set(slctdActsSet);
    nuArr.add(slctedAct);
    setSlctdActsSet(nuArr);
  }, [slctedAct]);

  return (
    <div>
      <p
        className={"act-elt" + (selected ? " selected" : "")}
        id={key}
        onClick={(e) => updateSlectedActivities(e)}
      >
        {elt}
      </p>
    </div>
  );
};

export default TripActivities;
