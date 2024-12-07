import { useSelector } from "react-redux";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "./style/itinerary.css";
import { LuDot } from "react-icons/lu";
import { useEffect } from "react";
import axios from "axios";

const Itinerary = () => {
  const state = useSelector((state) => state?.data?.userData?.state);
  const reasonState = useSelector(
    (state) => state?.data?.userData?.reasonForStateChoice
  );
  const area = useSelector((state) => state?.data?.userData?.area);
  const underhyped = useSelector((state) => state?.data?.userData?.underhyped);
  const note = useSelector((state) => state?.data?.userData?.note);
  const days = useSelector((state) => state?.data?.userData?.days);
  const tripType = useSelector((state) => state?.data?.userData?.tripType);

  useEffect(() => {
    const req = async () => {
      try {
        console.log("hello, mello");

        const data = await axios.post(
          "/openapi/itinerary",
          {
            state,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("data", data);
      } catch (e) {}
    };
    req();
  }, []);
  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="div-sub">
        <p className="state-name">{state}</p>
        <p className="sub-txt-days">
          {tripType}
          <LuDot className="dot" />
          {days}
        </p>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Itinerary;
