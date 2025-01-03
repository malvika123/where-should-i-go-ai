import {
  redirectToDeleteAccountValidationAndConfirmation,
  redirectToFeedbackPage,
} from "../../common/navigateTopath";
import { Footer } from "../../Footer/Footer";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import { RiDeleteBinLine } from "react-icons/ri";

import "./style/deleteAccount.css";

export const DeleteAccount = () => {
  return (
    <div className="dlt-acc-head">
      <TripPlannerHeader notshowSubHeader />
      <div className="delete-account-header">
        <p style={{ color: "rgb(21, 71, 105)" }}>
          Delete Account{" "}
          <RiDeleteBinLine style={{ backgroundColor: "yellow" }} />
        </p>
        <p className="text-gen-dlt">
          We’re sorry to see you go, but we respect your decision. Deleting your
          account will permanently remove all your data from our platform, and
          this action cannot be undone.
        </p>
        <p className="text-head-gen-dlt">Before you proceed, please note:</p>
        <ul>
          <li>
            <p className="text-gen-dlt">
              Your personalized recommendations and saved preferences will be
              lost.
            </p>
          </li>
          <li>
            <p className="text-gen-dlt">
              Any ongoing sessions or services will be immediately terminated.
            </p>
          </li>
        </ul>
        <p className="text-gen-dlt">
          If you’re sure you want to delete your account, please click the
          button below to confirm.
        </p>
        <p className="text-head-gen-dlt">Need Help or Have Feedback?</p>
        <p className="text-gen-dlt">
          We’d love to know how we can improve! Feel free to share your thoughts
          before you leave by clicking{" "}
          <span className="fdbk-dlt-pg" onClick={redirectToFeedbackPage}>
            here
          </span>
          .
        </p>
        <button
          className="del-btn-continue"
          onClick={redirectToDeleteAccountValidationAndConfirmation}
        >
          Continue
        </button>
      </div>
      <Footer />
    </div>
  );
};
