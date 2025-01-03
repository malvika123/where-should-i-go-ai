import { Footer } from "../Footer/Footer";
import TripPlannerHeader from "../Header/TripPlannerHeader";
import "./style/PageNotFound.css";
import img from "../images/mailbox-733161_1920.jpg";
import { redirectToHomePage } from "../common/navigateTopath";
const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "gray",
      }}
    >
      <TripPlannerHeader notshowSubHeader />
      <h1
        style={{ flex: "1", color: "yellow" }}
      >{`This Page is not found :(`}</h1>
      <p style={{ fontSize: "23px" }}>
        click{" "}
        <span
          onClick={redirectToHomePage}
          style={{ color: "white", cursor: "pointer" }}
        >
          here
        </span>{" "}
        to go back
      </p>
      <img className="img-404" src={img} />
      <Footer />
    </div>
  );
};

export default PageNotFound;
