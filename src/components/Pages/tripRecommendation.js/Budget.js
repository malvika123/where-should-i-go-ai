import { useEffect, useState } from "react";
import "./style/budget.css";
import { RxCrossCircled } from "react-icons/rx";
import CommonSpinner from "../../common/CommonSpinner";
import { IoIosBus } from "react-icons/io";

import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

import { RiEBikeLine } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";

import { RxHome } from "react-icons/rx";

import { TiPlaneOutline } from "react-icons/ti";

import { FcMoneyTransfer } from "react-icons/fc";
import { FaCarSide } from "react-icons/fa";

import axios from "axios";

export const Budget = ({
  setShowBudgetPopUp,
  userBase,
  state,
  days,
  setOpen,
  open,
  setBudget,
  budget,
  tips,
  setTips,
}) => {
  const [loading, setLoading] = useState(true);
  const userInfoCollected = JSON.parse(sessionStorage.getItem("collectedInfo"));
  const currPlace = userBase || userInfoCollected?.userBase;
  const currency = userInfoCollected?.currency;
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.post("/api/tripBudget", {
          from: currPlace,
          to: state,
          days: days,
          currency: currency || "USD",
        });
        setLoading(false);
        const dataRes = data?.data?.budget?.budget;
        const dataTips = data?.data?.budget?.tips;
        setBudget(dataRes);
        setTips(dataTips);
      } catch (e) {
        setShowBudgetPopUp(false);
      } finally {
        setOpen(false);
      }
    };
    if (open) {
      // console.log(open);
      getData();
    }
  }, [open]);

  return (
    <div>
      <div className="modal-background-here">
        <div className="budget-popup">
          <div className="header-modal">
            <p className="">
              <RxCrossCircled onClick={() => setShowBudgetPopUp(false)} />
            </p>
          </div>
          {open && loading && <CommonSpinner color={"orange"} width={20} />}

          {(!open || !loading) && (
            <div>
              <p className="budget-estimates-txt">
                Budget estimates - per person
                <TbMoneybag />
              </p>
              <div className="budget-body">
                <p className="budget-info-txt">
                  <span style={{ fontWeight: "bold" }}>from:</span> {currPlace}
                </p>
                <p className="budget-info-txt">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>to: </span>
                  {state}
                </p>
                <p className="budget-info-txt">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Days: </span>
                  {days}
                </p>
                <div className="line"></div>
                <p className="budget-info-txt">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    Flight <TiPlaneOutline />-{" "}
                  </span>
                </p>
                <p className="budget-info-txt">
                  Estimated cost of two way: {budget?.flights?.cost} {currency}
                </p>
                <p className="budget-info-txt">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    Accommodation <RxHome />-
                  </span>{" "}
                </p>
                <p className="budget-info-txt">
                  Estimated cost per night:{" "}
                  {budget?.accommodation?.cost_per_night} {currency}
                </p>
                <p className="budget-info-txt">
                  Estimated total cost: {budget?.accommodation?.total_cost}{" "}
                  {currency}
                </p>
                <p className="budget-info-txt">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    Food <IoFastFoodOutline />-
                  </span>{" "}
                </p>
                <p className="budget-info-txt">
                  Estimated cost per day: {budget?.food?.cost_per_day}{" "}
                  {currency}
                </p>
                <p className="budget-info-txt">
                  Estimated total cost: {budget?.food?.total_cost} {currency}
                </p>
                <p className="budget-info-txt">
                  <span style={{ fontWeight: "bold" }}>
                    Transportation(public transport)
                    <IoIosBus />-
                  </span>{" "}
                </p>
                <p className="budget-info-txt">
                  Estimated cost per day: {budget?.transportation?.cost}{" "}
                  {currency}
                </p>
                <p className="budget-info-txt">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    Bike renting <RiEBikeLine />-{" "}
                  </span>
                </p>
                <p className="budget-info-txt">
                  Estimated cost : {budget?.bike_rent?.cost} {currency}
                </p>
                <p className="budget-info-txt">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    Car renting <FaCarSide />-{" "}
                  </span>
                </p>
                <p className="budget-info-txt">
                  Estimated cost: {budget?.car_rent?.cost} {currency}
                </p>
                <div className="line"></div>

                <p className="budget-info-txt-fin">Total estimated budget - </p>
                <p className="budget-info-txt">
                  Estimated Average MAX cost for {days}:{" "}
                  {budget?.total_estimated_budget?.max} {currency}
                </p>
                <p className="budget-info-txt">
                  Estimated Average MIN cost for {days}:{" "}
                  {budget?.total_estimated_budget?.min} {currency}
                </p>
                <div className="line"></div>
                <div className="line"></div>
                <p className="budget-info-txt">
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    Tips <MdOutlineTipsAndUpdates />-{" "}
                  </span>
                </p>
                {/* {console.log(tips)} */}
                {tips?.map((elt) => {
                  return <p className="budget-info-txt">{elt}</p>;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
