import { useDispatch, useSelector } from "react-redux";
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
import { EmailSent } from "./EmailSent";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../store/slices/dataSlice";
import { isUserLoggedIn } from "../../common/utils";
import { Footer } from "../../Footer/Footer";

const Itinerary = () => {
  const state = useSelector((state) => state?.data?.userData?.state);
  const area = useSelector((state) => state?.data?.userData?.area);
  const underhyped = useSelector((state) => state?.data?.userData?.underhyped);
  const days = useSelector((state) => state?.data?.userData?.days);
  const tripType = useSelector((state) => state?.data?.userData?.tripType);
  const month = useSelector((state) => state?.data?.userData?.mnth);
  const gender = useSelector((state) => state?.data?.userData?.gender);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [error, setError] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [emailSent, setEmailSent] = useState("");
  const [itineraryObjData, setItineraryObjData] = useState();
  const stateObj = useSelector((state) => state?.data?.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const onNavigate = ({ path }) => {
    navigate(path);
  };

  if (!isUserLoggedIn()) {
    window.location.href = "/login";
  }

  useEffect(() => {
    setTimeout(() => setError(""), 5000);
  }, [error]);

  useEffect(() => {
    setTimeout(() => setEmailSent(""), 5000);
  }, [emailSent]);

  const SendEmail = () => {
    const formData = {
      name: userInfo?.name || "malvika",
      email: userInfo?.email || "malvikasen555@gmail.com",
      message: JSON.stringify(itineraryObjData),
    };
    fetch("/email/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("op");
        setEmailSent("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setEmailSent("Failed to send email.");
      });
  };

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
        setItineraryObjData(data?.data?.itinerary);
        const objStr = JSON.stringify(data?.data?.itinerary);
        dispatch(
          setUserData({
            ...stateObj,
            itinerary: `${objStr}`,
          })
        );
        console.log(
          "itineraryObjData",
          objStr,
          typeof objStr,
          itineraryObjData
        );
      } catch (e) {
        setError(e?.message);
      } finally {
        setSpinning(false);
      }
    };
    req();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
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
            setItineraryObjData={setItineraryObjData}
            setSpinning={setSpinning}
            spinning={spinning}
          />

          <span className="err-it">{error}</span>
          <GetItinerary
            itineraryObjData={itineraryObjData}
            spinning={spinning}
            className="getItinerary"
          />
        </div>
        {emailSent && <EmailSent text={emailSent} />}
        {itineraryObjData && (
          <div className="button-set">
            <button className="btn" onClick={() => SendEmail()}>
              Email me this Itinerary
            </button>
            <button
              className="btn"
              onClick={() => onNavigate({ path: "/ModifyReq?itinerary=true" })}
            >
              i need to add a lil more info
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Itinerary;
