import { useSelector } from "react-redux";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "./style/itinerary.css";
import { LuDot } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbCalendarMonth } from "react-icons/tb";
import { LuMap } from "react-icons/lu";
import { GetItinerary } from "./GetItinerary/GetItinerary";
import vid from "../../images/12747491_1920_1080_24fps.mp4";
import { PlacePallet } from "./GetItinerary/PlacePallet";
import { MdPlace } from "react-icons/md";

const Itinerary = () => {
  const state = useSelector((state) => state?.data?.userData?.state);
  const area = useSelector((state) => state?.data?.userData?.area);
  const underhyped = useSelector((state) => state?.data?.userData?.underhyped);
  const days = useSelector((state) => state?.data?.userData?.days);
  const tripType = useSelector((state) => state?.data?.userData?.tripType);
  const month = useSelector((state) => state?.data?.userData?.mnth);
  const gender = useSelector((state) => state?.data?.userData?.gender);
  const [selectedPlace, setSelectedPlace] = useState("");

  const [itineraryObjData, setItineraryObjData] = useState();

  const getItineraryCall = () => {
    const req = async () => {
      try {
        const data = await axios.post(
          "/openapi/itinerary",
          {
            days,
            tripType,
            area: selectedPlace,
            state,
            month,
            gender,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //console.log("op", data?.data?.itinerary["day1"]);
        setItineraryObjData(data?.data?.itinerary);
      } catch (e) {}
    };
    req();
  };
  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="div-sub">
        <p className="state-name">
          <MdPlace className="icons-itnry" />
          {state}
        </p>
        <p className="sub-txt-days">
          {tripType}
          <LuDot className="dot" />
          {days}
        </p>
        <div className="line"></div>
        <video className="bg-vid-itnry-res" autoPlay loop muted>
          <source src={vid} type="video/mp4" />
        </video>
        <div className="itnry-sub">
          <p className="itnry-sub-txt">
            Travelling Month <TbCalendarMonth className="icons-itnry" /> :
            {month}
          </p>
          <p className="itnry-sub-txt">
            State <LuMap className="icons-itnry" />: {state}
          </p>
        </div>
      </div>
      <div>
        <PlacePallet
          className="pallet"
          area={area}
          underhyped={underhyped}
          getItineraryCall={getItineraryCall}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
        />
        <GetItinerary
          itineraryObjData={itineraryObjData}
          className="getItinerary"
        />
      </div>
    </div>
  );
};

export default Itinerary;
