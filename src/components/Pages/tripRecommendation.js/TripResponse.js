import { useSelector } from "react-redux";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "./style/tripResponse.css";
import { useEffect, useState } from "react";
import ImgSlider from "./ImgSlider";
import { MdOutlineFmdGood } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { TbLocationSearch } from "react-icons/tb";
import { TiWarning } from "react-icons/ti";
import { RiEmotionHappyLine } from "react-icons/ri";
import { RiScissors2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import vid from "../../images/6981404-hd_1920_1080_25fps.mp4";
import { isUserLoggedIn } from "../../common/utils";
import { Footer } from "../../Footer/Footer";
import { useMediaQuery } from "react-responsive";
import { MdOutlineDangerous } from "react-icons/md";
import axios from "axios";

const TripResponse = () => {
  const state = useSelector((state) => state?.data?.userData?.state);
  const reasonState = useSelector(
    (state) => state?.data?.userData?.reasonForStateChoice
  );
  const area = useSelector((state) => state?.data?.userData?.area);
  const underhyped = useSelector((state) => state?.data?.userData?.underhyped);
  const avoidPlaces = useSelector((state) => {
    console.log(state);
    return state?.data?.userData?.avoidPlaces;
  });
  const note = useSelector((state) => state?.data?.userData?.note);
  const isMidScreen = useMediaQuery({ query: "(max-width: 1000px)" });
  const ismidLargeScreen = useMediaQuery({ query: "(max-width: 1360px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 765px)" });
  const [aqiInfo, setAqiInfo] = useState({});

  if (!isUserLoggedIn()) {
    window.location.href = "/login";
  }

  useEffect(() => {
    const getAqi = async () => {
      try {
        const data = await axios.get("/api/loc/aqi", {
          params: {
            place: state,
          },
        });
        console.log("hello", data?.data);
        setAqiInfo(data?.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAqi();
  }, []);

  const navigate = useNavigate();
  const NavigateTopath = ({ path }) => {
    navigate(path);
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
      <div className="trip-res-body">
        <div>
          <TripPlannerHeader notshowSubHeader={true} />
          <div className="trip-res-sub-body">
            <div className="trip-res-sub-body-sub">
              <p className="sub-txt-res">
                Recommendation based on your choices
              </p>
              <p className="state-name">{state}</p>
              {/* <video className="bg-vid-itnry" autoPlay loop muted>
              <source src={vid} type="video/mp4" />
            </video> */}
              <div className="line"></div>

              {state && (
                <ImgSlider
                  place={state}
                  showMultipleSlides={
                    isSmallScreen
                      ? 2
                      : isMidScreen
                      ? 3
                      : ismidLargeScreen
                      ? 4
                      : 5
                  }
                  classnm="res-img"
                  textClassnm="res-img-txt"
                />
              )}
              <span className="state-reason">{reasonState}</span>
              <p className="idl-text">
                Ideal places to visit{" "}
                <GrMapLocation style={{ color: "pink" }} />
              </p>
              <p className="idl-sub-text">
                Discover the must-see destinations for your next unforgettable
                adventure.
              </p>
              {area &&
                area?.map((elt) => {
                  return (
                    <div className="idl-places-arr">
                      <p className="idl-name">{elt.name} </p>
                      <p className="idl-desc">{elt.description}</p>
                      {elt.name && (
                        <ImgSlider
                          place={elt.name}
                          showMultipleSlides={
                            isSmallScreen
                              ? 2
                              : isMidScreen
                              ? 3
                              : ismidLargeScreen
                              ? 4
                              : 5
                          }
                          classnm="res-img"
                          textClassnm="res-img-txt"
                        />
                      )}
                    </div>
                  );
                })}
              <p className="offbeat-text">
                Off beat places <TbLocationSearch style={{ color: "pink" }} />
              </p>
              <p className="idl-sub-text">
                Explore hidden gems and unique destinations off the beaten path.
              </p>
              {underhyped?.map((elt) => {
                return (
                  <div>
                    <p className="off-name">{elt.name} </p>
                    <p className="off-desc">{elt.description}</p>
                    {elt.name && (
                      <ImgSlider
                        place={elt.name}
                        showMultipleSlides={
                          isSmallScreen
                            ? 2
                            : isMidScreen
                            ? 3
                            : ismidLargeScreen
                            ? 4
                            : 5
                        }
                        classnm="res-img"
                        textClassnm="res-img-txt"
                      />
                    )}
                  </div>
                );
              })}
              <p className="prec-text">
                Precautionary Warning <TiWarning style={{ color: "yellow" }} />
              </p>
              <p className="idl-sub-text">
                Stay informed and prepared with essential safety tips for your
                journey.
              </p>
              <span className="prec-note">{note}</span>
            </div>
            <section style={{ marginBottom: "30px" }}>
              <p className="prec-text">AQI information</p>
              <p className="idl-sub-text">
                check the air quality index of the recommended place
              </p>
              <p className="air-qual">AQI: {aqiInfo?.aqi}</p>
              <p className="air-qual">
                AQI category:{" "}
                <span style={{ backgroundColor: "orange", color: "white" }}>
                  {aqiInfo?.category}
                </span>
              </p>
            </section>
            <section>
              <p className="offbeat-text">
                Places to avoid{" "}
                <MdOutlineDangerous
                  style={{
                    color: "red",
                    backgroundColor: "white",
                    borderRadius: "20px",
                  }}
                />
              </p>
              <p className="idl-sub-text">
                Discover the places to avoid so you can travel smarter, stay
                safe, and make the most of your adventures.
              </p>
              {avoidPlaces?.map((elt) => {
                return (
                  <div>
                    <p className="off-name">{elt.name} </p>
                    <p className="off-desc">{elt.reason}</p>
                    {elt.name && (
                      <ImgSlider
                        place={elt.name}
                        showMultipleSlides={
                          isSmallScreen
                            ? 2
                            : isMidScreen
                            ? 3
                            : ismidLargeScreen
                            ? 4
                            : 5
                        }
                        classnm="res-img"
                        textClassnm="res-img-txt"
                      />
                    )}
                  </div>
                );
              })}
            </section>
            <div className="line"></div>
            <div>
              <p>
                Happy with the Recommendation? <RiEmotionHappyLine />
              </p>
              <p className="off-desc">
                Happy with the recommendation? Let us take it a step further!
                Explore a tailored itinerary designed to make your trip seamless
                and unforgettable. From must-visit spots to hidden gems, we've
                got your journey mapped out for you.
              </p>
              <button
                className="itnry"
                onClick={() => NavigateTopath({ path: "/itinerary" })}
              >
                Take me to my itinerary
              </button>
              <button
                className="itnry"
                onClick={() => NavigateTopath({ path: "/ModifyReq" })}
              >
                I need to add some more info
              </button>
            </div>
            <h6 style={{ marginTop: "50px", color: "red" }}>
              *some images may not belong to the place
            </h6>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripResponse;
