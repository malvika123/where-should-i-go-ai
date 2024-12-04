import { useSelector } from "react-redux";
import TripPlannerHeader from "../../Header/TripPlannerHeader";

const TripResponse = () => {
  const userData = useSelector((state) => state?.data?.userData?.data);

  return (
    <div className="trip-planner">
      <div>
        <TripPlannerHeader notshowSubHeader={true} />
        <div>
          <p>{userData}</p>
        </div>
      </div>
    </div>
  );
};

export default TripResponse;
