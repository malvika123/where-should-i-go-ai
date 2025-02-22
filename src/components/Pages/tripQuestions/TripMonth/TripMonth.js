import { useEffect, useState, useContext } from "react";
import "../style/TripMonth.css";
import { MONTH_LENGTH, WHENYOUGOING } from "../utils/constants";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Month from "./Month";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { AppContext } from "../../../context/AppContext";

let month = [
  ["January", false, "monthName"],
  ["February", false, "monthName"],
  ["March", false, "monthName"],
  ["April", false, "monthName"],
  ["May", false, "monthName"],
  ["June", false, "monthName"],
  ["July", false, "monthName"],
  ["August", false, "monthName"],
  ["September", false, "monthName"],
  ["October", false, "monthName"],
  ["November", false, "monthName"],
  ["December", false, "monthName"],
];

const TripMonth = () => {
  const [months, setMonth] = useState(month);
  const [selectedId, setSelectedId] = useState();
  const [showNextButton, setShowNextButton] = useState(false);
  const {
    setProgress,
    setNextPath,
    setPage,
    page,
    days,
    setDays,
    mnth,
    setMnth,
  } = useContext(AppContext);

  useEffect(() => {
    setPage(1);
  }, []);
  const clicked = (e) => {
    setMnth(e.target.innerText);
    setSelectedId(e.currentTarget.id);
  };

  useEffect(() => {
    if (mnth && days) {
      setShowNextButton(true);
    }
  }, [mnth, showNextButton]);

  useEffect(() => {
    const nuMonth = month.map((elt, id) => {
      const arr = [];
      if (id.toString() === selectedId) {
        arr.push(elt[0]);
        arr.push(true);
        arr.push("after");
        return arr;
      }
      arr.push(elt[0]);
      arr.push(false);
      arr.push("monthName");
      return arr;
    });
    setMonth(nuMonth);
  }, [selectedId]);

  const checkIfSelected = (elt) => {
    return elt[0] === mnth;
  };

  return (
    <div>
      <h5 className="Heading">{WHENYOUGOING}</h5>
      <h6 className="subHeading">{MONTH_LENGTH}</h6>
      <div className="month">
        {months.map((elt, key) => (
          <Month
            elt={elt}
            id={key}
            clicked={clicked}
            setSelectedId={setSelectedId}
            isChecked={checkIfSelected(elt)}
          />
        ))}
      </div>

      <div className="day-slctr">
        <h4 className="days-text">And for how many days?</h4>

        <div className="slctr">
          <IoRemoveCircleOutline
            className="minus"
            onClick={() => setDays((prev) => (prev > 1 ? prev - 1 : prev))}
          />
          <p className="day">{days}</p>
          <IoAddCircleOutline
            className="plus"
            onClick={() => setDays((prev) => (prev < 7 ? prev + 1 : prev))}
          />
        </div>
      </div>
      <TripPlannerFooter
        showNext={showNextButton}
        hideBack={true}
        setNextPath={setNextPath}
        nextPath={"/gender"}
        backPath={"/tripTailor"}
        setProgress={setProgress}
        setProgressVal={25}
      />
    </div>
  );
};

export default TripMonth;
