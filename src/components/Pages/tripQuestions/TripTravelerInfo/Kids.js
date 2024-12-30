import "./style/trip.css";
import "./style/pets.css";
import { useContext, useEffect, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import KidInfoTooltip from "./tooltips/KidInfoTooltip";
import { AppContext } from "../../../context/AppContext";

const Kids = () => {
  const [showSelectedKidsOption, setSelectedKidsOption] = useState();
  const [styleToolTip, setStyleToolTip] = useState({ display: "none" });
  const { hasKids, setHasKids } = useContext(AppContext);

  const setKidsSelection = (e, option) => {
    setHasKids(option);
    showSelectedKidsOption && showSelectedKidsOption.toggle("onClick");
    setSelectedKidsOption(e.currentTarget.classList);
  };

  useEffect(() => {
    showSelectedKidsOption && showSelectedKidsOption.add("onClick");
  }, [showSelectedKidsOption]);

  return (
    <div className="kids">
      <div className="header">
        <h4>Are you travelling with children?</h4>
        <IoMdInformationCircleOutline
          onMouseEnter={(e) => setStyleToolTip({ display: "block" })}
          onMouseLeave={(e) => setStyleToolTip({ display: "none" })}
        />
        <div style={styleToolTip}>
          <KidInfoTooltip />
        </div>
      </div>
      <div className="options">
        <h5
          className={"yes" + (hasKids ? " onClick" : "")}
          onClick={(e) => setKidsSelection(e, true)}
        >
          Yes
        </h5>
        <h5
          className={"no" + (!hasKids ? " onClick" : "")}
          onClick={(e) => setKidsSelection(e, false)}
        >
          No
        </h5>
      </div>
    </div>
  );
};

export default Kids;
