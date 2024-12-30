import "./style/payment.css";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import { isUserLoggedIn } from "../../common/utils";
import { useEffect } from "react";

const Payment = () => {
  useEffect(() => {
    if (!isUserLoggedIn()) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div>
      <TripPlannerHeader notshowSubHeader={true} />
      <div className="payment-div">
        <p className="heading-payment">Payment</p>
        <p className="subHead-payment">
          All transactions are secure and encrypted.
        </p>
      </div>
    </div>
  );
};

export default Payment;
