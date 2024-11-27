import { useContext, useEffect, useState } from "react";
import "./style/pets.css";
import PetInfoTooltip from "./tooltips/PetInfoTooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";

const Pets = () => {
  const [selectedOption, setSelectedOption] = useState();
  const [styleToolTip, setStyleToolTip] = useState({ display: "none" });
  const { setPets } = useContext(AppContext);

  const setPetsSelection = (e, sel) => {
    setPets(sel);
    selectedOption && selectedOption.toggle("onClick");
    setSelectedOption(e.currentTarget.classList);
  };
  useEffect(() => {
    selectedOption && selectedOption.add("onClick");
  }, [selectedOption]);
  return (
    <div className="pets">
      <div className="header">
        <h4 className="txt">Are you travelling with pets?</h4>{" "}
        <IoMdInformationCircleOutline
          onMouseEnter={(e) => setStyleToolTip({ display: "block" })}
          onMouseLeave={(e) => setStyleToolTip({ display: "none" })}
        />
        <div style={styleToolTip}>
          <PetInfoTooltip />
        </div>
      </div>

      <div className="options">
        <h5 className="yes" onClick={(e) => setPetsSelection(e, true)}>
          Yes
        </h5>
        <h5 className="no" onClick={(e) => setPetsSelection(e, false)}>
          No
        </h5>
      </div>
    </div>
  );
};

export default Pets;
