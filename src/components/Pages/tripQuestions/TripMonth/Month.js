import "../style/TripMonth.css";
import { IoIosAirplane } from "react-icons/io";

const Month = ({ elt, id, clicked, setSelectedId, isChecked }) => {
  const onClick = (e) => {
    clicked(e);
  };
  return (
    <p
      value={elt}
      id={id}
      className={isChecked ? " after" : elt[2]}
      onClick={(e) => onClick(e)}
    >
      <span>
        {elt[1] || isChecked ? <IoIosAirplane className="plane" /> : null}{" "}
        {elt[0]}
      </span>
    </p>
  );
};

export default Month;
