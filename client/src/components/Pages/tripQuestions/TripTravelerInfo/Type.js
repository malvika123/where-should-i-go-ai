import "./style/trip.css";
import { RxPerson } from "react-icons/rx";
import { BsPersonHearts } from "react-icons/bs";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdFamilyRestroom } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Kids from "./Kids";
import WomanTraveler from "./WomanTraveler";
import { AppContext } from "../../../context/AppContext";

const Type = () => {
  const [seletedTrip, setSelectedTrip] = useState();
  const [showFamily, setShowFamily] = useState(false);
  const [showWoman, setShowWoman] = useState(false);

  const { tripType, setTripType } = useContext(AppContext);

  const settingTripType = (e, type) => {
    setTripType(type);
    seletedTrip && seletedTrip.toggle("onClick");
    setSelectedTrip(e.currentTarget.classList);
  };

  useEffect(() => {
    seletedTrip && seletedTrip.add("onClick");
    if (tripType === "Family Trip" || tripType === "Friends Trip") {
      setShowFamily(true);
    } else {
      setShowFamily(false);
    }

    if (
      tripType === "Family Trip" ||
      tripType === "Friends Trip" ||
      tripType === "Partner Trip"
    ) {
      setShowWoman(true);
    } else {
      setShowWoman(false);
    }
  }, [seletedTrip, tripType]);

  return (
    <div className="trip">
      <h4>What kind of trip are you planning?</h4>
      <h5 className="sub-hdng">Select one.</h5>
      <div className="trip-type">
        <div
          className={
            "trip-type-sub" + (tripType === "Solo Trip" ? " onClick" : null)
          }
          onClick={(e) => settingTripType(e, "Solo Trip")}
        >
          <RxPerson className="icon" />
          <h5 className="trip-txt">Solo Trip</h5>
        </div>
        <div
          className={
            "trip-type-sub" + (tripType === "Partner Trip" ? " onClick" : null)
          }
          onClick={(e) => settingTripType(e, "Partner Trip")}
        >
          <BsPersonHearts className="icon" />
          <h5 className="trip-txt">Partner Trip</h5>
        </div>
        <div
          className={
            "trip-type-sub" + (tripType === "Friends Trip" ? " onClick" : null)
          }
          onClick={(e) => settingTripType(e, "Friends Trip")}
        >
          <LiaUserFriendsSolid className="icon" />
          <h5 className="trip-txt">Friends Trip</h5>
        </div>
        <div
          className={
            "trip-type-sub" + (tripType === "Family Trip" ? " onClick" : null)
          }
          onClick={(e) => settingTripType(e, "Family Trip")}
        >
          <MdFamilyRestroom className="icon" />
          <h5 className="trip-txt">Family Trip</h5>
        </div>
      </div>
      {showWoman && <WomanTraveler />}
      {showFamily && <Kids />}
    </div>
  );
};

export default Type;
