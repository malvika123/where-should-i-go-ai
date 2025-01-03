import { Footer } from "../../Footer/Footer";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import { ValidateEmail } from "../Login/ValidateEmail";

export const DeleteAccountAndVerification = () => {
  return (
    <div className="dlt-acc-head">
      <TripPlannerHeader notshowSubHeader />
      <div className="delete-account-header">
        <p>Verify and Delete Account</p>
        Let's validate your email
      </div>
      <Footer />
    </div>
  );
};
