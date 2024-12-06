import { CgArrowLeft } from "react-icons/cg";
import { landingPageHeader, TRIP_PLANNER } from "../common/constants";
import "./style/TripPlannerHeader.css";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const TripPlannerHeader = ({ notshowSubHeader }) => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="header-top">
        <h3 onClick={navigateTo} className="backbutton">
          <CgArrowLeft />
        </h3>
        <p className="header1" onClick={() => document.location.assign("/")}>
          <Logo /> {landingPageHeader}
        </p>
      </div>
      {!notshowSubHeader && (
        <h3 className="trip-planner-header">{TRIP_PLANNER}</h3>
      )}
    </div>
  );
};

export default TripPlannerHeader;
