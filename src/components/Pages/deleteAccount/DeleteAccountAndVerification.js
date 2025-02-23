import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import { ValidateEmail } from "../Login/ValidateEmail";
import { Alert } from "../Login/Alert";
import { cuidCookie, sanitizeInput } from "../../common/utils";
import axios from "axios";

export const DeleteAccountAndVerification = () => {
  const [accountDelReason, setAccountDelReason] = useState("");
  const [updatedData, setUpdatedData] = useState("");
  const [alert, setAlert] = useState("");
  const deleteAccount = async () => {
    const data =
      "account deleted : " +
        (accountDelReason === "Other (please specify):" && updatedData) ||
      accountDelReason;
    if (
      (accountDelReason && accountDelReason !== "Other (please specify):") ||
      (accountDelReason === "Other (please specify):" && updatedData)
    ) {
      try {
        await axios.post("/api/send/sendFeedback", { data });
        await axios.post("/api/user/deleteAccount", { id: cuidCookie() });
        setAlert("Account deleted");
        localStorage.removeItem("userInfo");
        window.location.replace("/");
      } catch (e) {
        setAlert("Something went wrong");
      }
    } else {
      setAlert("Please select appropriate option");
    }
  };

  useEffect(() => {
    setTimeout(() => setAlert(""), 4000);
  }, [alert]);

  return (
    <div className="dlt-acc-head">
      <TripPlannerHeader notshowSubHeader />
      <div className="delete-account-header">
        <p style={{ marginBottom: "5%" }}> Delete Account</p>
        <p style={{ fontSize: "18px", color: "red" }}>{alert}</p>

        <p style={{ fontSize: "20px", marginBottom: "1%" }}>
          Its sad to see you go, but before you go please let us know the
          reason:
        </p>
        <div>
          <p
            className="txt-optns"
            onClick={() => setAccountDelReason("I no longer use this service.")}
          >
            {" "}
            <input
              type="radio"
              checked={accountDelReason === "I no longer use this service."}
            />{" "}
            I no longer use this service.
          </p>
          <br />
          <p
            className="txt-optns"
            onClick={() =>
              setAccountDelReason("I have privacy or security concerns.")
            }
          >
            {" "}
            <input
              type="radio"
              checked={
                accountDelReason === "I have privacy or security concerns."
              }
            />{" "}
            I have privacy or security concerns.
          </p>
          <br />{" "}
          <p
            className="txt-optns"
            onClick={() =>
              setAccountDelReason("I receive too many emails or notifications.")
            }
          >
            {" "}
            <input
              type="radio"
              checked={
                accountDelReason ===
                "I receive too many emails or notifications."
              }
            />{" "}
            I receive too many emails or notifications.
          </p>
          <br />
          <p
            className="txt-optns"
            onClick={() =>
              setAccountDelReason("I found an alternative service.")
            }
          >
            {" "}
            <input
              type="radio"
              checked={accountDelReason === "I found an alternative service."}
            />{" "}
            I found an alternative service.
          </p>
          <br />{" "}
          <p
            className="txt-optns"
            onClick={() =>
              setAccountDelReason(
                "I had a bad experience (e.g., bugs, poor support)."
              )
            }
          >
            {" "}
            <input
              type="radio"
              checked={
                accountDelReason ===
                "I had a bad experience (e.g., bugs, poor support)."
              }
            />{" "}
            I had a bad experience (e.g., bugs, poor support).
          </p>
          <br />
          <p
            className="txt-optns"
            onClick={() =>
              setAccountDelReason("The platform is too difficult to use.")
            }
          >
            {" "}
            <input
              type="radio"
              checked={
                accountDelReason === "The platform is too difficult to use."
              }
            />{" "}
            The platform is too difficult to use.
          </p>
          <br />
          <p
            className="txt-optns"
            onClick={() => setAccountDelReason("Other (please specify):")}
          >
            {" "}
            <input
              type="radio"
              checked={accountDelReason === "Other (please specify):"}
            />{" "}
            Other (please specify):
          </p>
          <br />
          {accountDelReason === "Other (please specify):" && (
            <input
              type="input"
              onChange={(e) => setUpdatedData(sanitizeInput(e.target.value))}
              style={{ width: "25vw", height: "10vh", borderRadius: "10px" }}
            />
          )}
        </div>

        <button className="delete-btn" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
      <Footer />
    </div>
  );
};
