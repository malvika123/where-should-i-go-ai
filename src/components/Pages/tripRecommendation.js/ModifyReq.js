import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "./style/modifyreq.css";
import { useDispatch, useSelector } from "react-redux";
import { MdPlace } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import img from "../../images/antonino-visalli-RNiBLy7aHck-unsplash.jpg";
import img2 from "../../images/nathan-anderson-GM5Yn5XRVqA-unsplash.jpg";
import { setUserData } from "../../store/slices/dataSlice";
import { TbCalendarMonth } from "react-icons/tb";
import { LuMap } from "react-icons/lu";
import { useEffect, useState } from "react";
import Spinner from "../tripQuestions/ShowFinalInfo/Spinner";
import SpinnerItinerary from "./GetItinerary/SpinnerItinerary";
import { CommonSpinner } from "./CommonSpinner";
import axios from "axios";
import { GetItinerary } from "./GetItinerary/GetItinerary";
import { SendEmail } from "./SendEmail";
import { EmailSent } from "./EmailSent";
import { tripRecommendationPath } from "../../common/constants";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../common/utils";
import { Footer } from "../../Footer/Footer";

export const ModifyReq = () => {
  const state = useSelector((state) => state?.data?.userData?.state);
  const itinerary = useSelector((state) => {
    return state?.data?.userData?.itinerary;
  });
  const days = useSelector((state) => state?.data?.userData?.days);
  const tripType = useSelector((state) => state?.data?.userData?.tripType);
  const month = useSelector((state) => state?.data?.userData?.mnth);
  const recomm = useSelector((state) => state?.data?.userData?.recomm);
  const stateObj = useSelector((state) => state?.data?.userData);
  const dispatch = useDispatch();

  const [spinning, setSpinning] = useState(false);
  const [addData, setAddData] = useState("");
  const [itineraryObjData, setItineraryObjData] = useState();
  const [emailSent, setEmailSent] = useState("");
  const itineraryPath = window?.location?.search?.includes("itinerary");

  if (!isUserLoggedIn()) {
    window.location.href = "/login";
  }

  const navigate = useNavigate();
  const NavigateTopath = ({ path }) => {
    navigate(path);
  };

  const handleClick = () => {
    if (addData) {
      setSpinning(true);
      if (itineraryPath) {
        const res = async () => {
          try {
            const data = await axios.post(
              "/api/openapi/extraInfo",
              { itinerary, newData: addData },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            setItineraryObjData(data?.data?.itinerary);
          } catch (e) {
          } finally {
            setSpinning(false);
          }
        };
        res();
      } else {
        const res = async () => {
          try {
            const data = await axios.post(
              "/api/openapi/updatedInfo",
              {
                recomm,
                newData: addData,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch(
              setUserData({
                ...stateObj,
                state: data?.data?.jsonObj?.state,
                reasonForStateChoice: data?.data?.jsonObj?.reason,
                area: data?.data?.jsonObj?.["places_to_visit"],
                underhyped: data?.data?.jsonObj?.["off_beat_places"],
                note: data?.data?.jsonObj?.["precautions"],
                recomm: `${JSON.stringify(data?.data?.jsonObj)}`,
              })
            );
            NavigateTopath({ path: tripRecommendationPath });
          } catch (e) {
            console.log(e);
          } finally {
            setSpinning(false);
          }
        };
        res();
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setEmailSent(""), 5000);
  }, [emailSent]);

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

        <div className="sub-div-mod">
          <div className="modify-req-head">
            <p className="sub-txt-res">Recommendation based on your choices</p>
            <p className="state-name">
              {" "}
              <MdPlace className="icons-itnry" />
              {state}
            </p>
            <p className="sub-txt-days">
              {tripType}
              <LuDot className="dot" />
              {days}
            </p>
            <div className="line"></div>
            <div className="image-mod">
              {/* <p className="text-mod">
              Let the adventure begin! Find your perfect destination with just a
              few taps and make every journey a joy!
            </p> */}
              {itineraryPath ? (
                <img
                  className="img-mod"
                  src={img}
                  alt="AI-powered travel planner recommending destinations"
                  loading="lazy"
                ></img>
              ) : (
                <img
                  className="img-mod"
                  src={img2}
                  alt="AI-powered travel planner recommending destinations"
                  loading="lazy"
                ></img>
              )}
            </div>
            {/* <div className="itnry-sub">
            <p className="itnry-sub-txt">
              Travelling Month <TbCalendarMonth className="icons-itnry" /> :
              {month}
            </p>
            <p className="itnry-sub-txt">
              State <LuMap className="icons-itnry" />: {state}
            </p>
          </div>  */}
            {spinning && !itineraryObjData ? (
              <div>
                <CommonSpinner
                  classHeaders="commonSpinner"
                  classText="commonSpinnerText"
                  text=""
                />
              </div>
            ) : itineraryObjData ? (
              <div>
                <GetItinerary
                  itineraryObjData={itineraryObjData}
                  spinning={spinning}
                  className="getItinerary"
                />

                <button
                  onClick={() => {
                    setEmailSent("Sending email ...");
                    SendEmail({ itineraryObjData, setEmailSent });
                  }}
                  style={{
                    marginBottom: "5%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "white",
                    backgroundColor: "black",
                    padding: "10px",
                    borderRadius: "12px",
                    fontSize: "18px",
                    float: "right",
                  }}
                >
                  Email me this Itinerary
                </button>
                {emailSent && <EmailSent text={emailSent} />}
              </div>
            ) : (
              <div className="data-collection">
                <p style={{ fontSize: "30px", color: "rgb(49, 87, 164)" }}>
                  Collecting Missing Information
                </p>
                <p style={{ fontSize: "20px", color: "gray" }}>
                  If any details were missed during our last update, please
                  provide them here. Your input helps us ensure accuracy and
                  deliver the best experience. Thank you!
                </p>
                <textarea
                  style={{
                    marginTop: "5%",
                    width: "70vw",
                    margin: "auto",
                    borderRadius: "12px",
                    padding: "12px",
                    fontSize: "18px",
                    marginBottom: "5%",
                    height: "25vh",
                    background: "yellow",
                    color: "rgb(49, 87, 164)",
                    fontWeight: "bolder",
                  }}
                  placeholder="Please add your thoughts here ... "
                  onChange={(e) => setAddData(e.currentTarget.value)}
                />
                <button
                  onClick={() => handleClick()}
                  style={{
                    marginBottom: "5%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "white",
                    backgroundColor: "black",
                    padding: "10px",
                    borderRadius: "12px",
                    fontSize: "18px",
                  }}
                >
                  Process my data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
