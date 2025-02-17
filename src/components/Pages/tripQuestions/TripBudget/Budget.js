import { useContext, useEffect, useState } from "react";
//Your API Key: d88c78613cb78e38640faea8
//https://app.exchangerate-api.com/dashboard/confirmed
import axios from "axios";
import "../style/Budget.css";
import CurrencyTooltip from "./CurrencyTooltip";
import TripPlannerFooter from "../../../Footer/TripPlannerFooter";
import { TbPigMoney } from "react-icons/tb";
import { AppContext } from "../../../context/AppContext";

const Budget = () => {
  const [changeToTextField, setChangeToTextField] = useState();
  const [styleToolTip, setStyleToolTip] = useState({ display: "none" });
  const [showNextButton, setShowNextButton] = useState(false);
  const {
    setProgress,
    setNextPath,
    setPage,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    currency,
    setCurrency,
    modifiedCurrency,
    setModiefiedCurrency,
  } = useContext(AppContext);

  useEffect(() => {
    setPage(6);
  }, []);

  useEffect(() => {
    const currDataCall = async () => {
      try {
        const currdata = await axios.post("/api/cur/currency");
        setCurrency(currdata?.data?.cur);
      } catch (e) {
        setChangeToTextField(true);
      }
    };
    currDataCall();
  }, []);

  return (
    <div>
      <h4 className="">Please add your budget</h4>
      <h6 className="sub-hdng">Add the range of your budget below</h6>
      <div className="price-sel">
        <div className="min-budg-div">
          <TbPigMoney className="cash-icon" />
          <input
            type="number"
            min="0"
            className="min-budg"
            value={minValue}
            placeholder="Min value"
            onChange={(e) => setMinValue(e.currentTarget.value)}
          />
        </div>
        <h4 className="dash">-</h4>
        <div className="max-budg-div">
          <TbPigMoney className="cash-icon" />
          <input
            type="number"
            min="0"
            className="max-budg"
            value={maxValue}
            placeholder="Max value"
            onChange={(e) => setMaxValue(e.currentTarget.value)}
          />
        </div>

        <div
          onMouseEnter={(e) => setStyleToolTip({ display: "block" })}
          onMouseLeave={(e) => setStyleToolTip({ display: "none" })}
        >
          {!changeToTextField && (
            <h4 className="curr" onClick={() => setChangeToTextField(true)}>
              {currency}
            </h4>
          )}
        </div>

        {!changeToTextField && (
          <div style={styleToolTip}>
            <CurrencyTooltip />
          </div>
        )}

        {changeToTextField && (
          <input
            type="text"
            value={modifiedCurrency}
            className="curr1"
            onChange={(e) => setModiefiedCurrency(e.currentTarget.value)}
            placeholder={currency || "Currency"}
          />
        )}
      </div>
      <TripPlannerFooter
        showNext={showNextButton}
        setNextPath={setNextPath}
        nextPath={"/tripType"}
        setProgress={setProgress}
        backPath={"/tripInfo"}
        setProgressVal={72}
        resetProgressVal={48}
      />
    </div>
  );
};

export default Budget;
