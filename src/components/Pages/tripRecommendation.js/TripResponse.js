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
import { FaPlaneCircleExclamation } from "react-icons/fa6";
import { PiCursorClickDuotone } from "react-icons/pi";

import {
  ismidLargeScreen,
  isMidScreen,
  isSmallScreen,
  isUserLoggedIn,
} from "../../common/utils";
import { Footer } from "../../Footer/Footer";
import { MdOutlineDangerous } from "react-icons/md";
import axios from "axios";
import { ShortsSlider } from "./ShortsSlider";
import { TopRatedHotels } from "./TopRatedHotels";
import { TopRatedVegRestaurants } from "./TopRatedVegRestaurants";
import { TopRatedNonVegRestaurants } from "./TopRatedNonVegRestaurants";
import { useMediaQuery } from "react-responsive";
import { TripResponseReview } from "./Review";
import { Budget } from "./Budget";

const TripResponse = () => {
  const state = useSelector((state) => state?.data?.userData?.state);
  const userBase = useSelector((state) => state?.data?.userData?.userBase);
  const days = useSelector((state) => state?.data?.userData?.days);
  const reasonState = useSelector(
    (state) => state?.data?.userData?.reasonForStateChoice
  );
  const area = useSelector((state) => state?.data?.userData?.area);
  const underhyped = useSelector((state) => state?.data?.userData?.underhyped);
  const avoidPlaces = useSelector((state) => {
    return state?.data?.userData?.avoidPlaces;
  });
  const note = useSelector((state) => state?.data?.userData?.note);

  const [aqiInfo, setAqiInfo] = useState({});
  const isMidScreen = useMediaQuery({ query: "(max-width: 1000px)" });
  const ismidLargeScreen = useMediaQuery({
    query: "(max-width: 1360px)",
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 765px)" });
  const [selectedAreaVideo, setSelectedAreaVideo] = useState();
  const [selectedVideoLodge, setSelectedLodge] = useState();
  const [selectedAreaRestaurant, setSelectedRestaurant] = useState();

  const [showAreaVid, setShowAreaVid] = useState(false);
  const [showunderhypedVid, setShowUnderhypedVid] = useState(false);

  const [showAreaLodge, setShowAreaLodge] = useState(false);
  const [showunderhypedLodge, setShowUnderhypedLodge] = useState(false);

  const [showAreaRestaurants, setShowAreaRestaurants] = useState(false);
  const [showunderhypedRestaurants, setShowUnderhypedRestaurants] =
    useState(false);
  const [open, setOpen] = useState(true);
  const [budget, setBudget] = useState({});
  const [tips, setTips] = useState([]);

  const [showBudgetPopUp, setShowBudgetPopUp] = useState(false);
  const skippedLogin = sessionStorage.getItem("skippedLogin");
  const isLoginSkipped = () => {
    const timeNow = Math.floor(Date.now() / 1000)?.toString();
    if (skippedLogin > timeNow) {
      return true;
    }
    return false;
  };

  const [calDist, setCalDistMap] = useState({});

  useEffect(() => {
    area?.map(async (elt) => {
      try {
        const dist = await getDistance(elt.name);

        setCalDistMap((prevState) => {
          return {
            ...prevState,
            [elt.name]: dist,
          };
        });
      } catch (er) {}
    });

    underhyped?.map(async (elt) => {
      try {
        const dist = await getDistance(elt.name);

        setCalDistMap((prevState) => {
          return {
            ...prevState,
            [elt.name]: dist,
          };
        });
      } catch (er) {}
    });
  }, []);

  const getDistance = async (place) => {
    const getDist = async () => {
      //console.log(userBase, "opo");
      try {
        const data = await axios.post("/api/loc/caldistance", {
          origin: "bangalore" || userBase,
          destination: place,
        });
        const distance = data?.data?.distance;
        const duration = data?.data?.duration;
        return { distance, duration };
      } catch (e) {
        //console.log(e, "erroru");
      }
    };
    const data = getDist();
    return data;
  };

  if (!isLoginSkipped() && !isUserLoggedIn()) {
    window.location.href = "/login?unauthorised=true&from=tripTailor";
  }

  const clickedArea = (e) => {
    const name = e.target.innerText.replace(">> Show videos of ", "");
    setSelectedAreaVideo(name);
    setShowAreaVid((prev) => !prev);
  };

  const clickedAreaLodge = (e) => {
    const name = e.target.innerText.replace(">> Top rated Lodge of ", "");
    setSelectedLodge(name);
    setShowAreaLodge((prev) => !prev);
  };

  const clickedAreaRestaurants = (e) => {
    const name = e.target.innerText.replace(">> Top rated Restaurants of ", "");
    setSelectedRestaurant(name);
    setShowAreaRestaurants((prev) => !prev);
  };

  const clickedUnderHypedArea = (e) => {
    const name = e.target.innerText.replace(">> Show videos of ", "");
    setSelectedAreaVideo(name);
    setShowUnderhypedVid((prev) => !prev);
  };

  const clickedUnderHypedAreaLodge = (e) => {
    const name = e.target.innerText.replace(">> Top rated Lodge of ", "");
    setSelectedLodge(name);
    setShowUnderhypedLodge((prev) => !prev);
  };

  const clickedUnderHypedAreaRestaurants = (e) => {
    const name = e.target.innerText.replace(">> Top rated Restaurants of ", "");
    setSelectedRestaurant(name);
    setShowUnderhypedRestaurants((prev) => !prev);
  };

  useEffect(() => {
    const getAqi = async () => {
      try {
        const data = await axios.get("/api/loc/aqi", {
          params: {
            place: state,
          },
        });
        //console.log("hello", data?.data);
        setAqiInfo(data?.data);
      } catch (e) {
        //console.log(e);
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

              <p className="state-name">
                <a
                  style={{
                    color: "inherit",
                  }}
                  href={`https://www.google.com/search?q=${state}`}
                  target="_blank"
                >
                  {state}{" "}
                </a>
              </p>

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
              <p
                style={{
                  fontSize: "20px",
                  textDecoration: "underline",
                  color: "blue",
                }}
              >
                <a href="https://www.skyscanner.com/" target="_blank">
                  Book a flight on skyscanner
                </a>
              </p>
              <section style={{ marginBottom: "30px" }}>
                <p className="prec-text">AQI information</p>
                <p className="idl-sub-text">
                  Check the air quality index of the recommended place
                </p>
                <p className="air-qual">AQI: {aqiInfo?.aqi}</p>
                <p className="air-qual">
                  AQI category:{" "}
                  <span style={{ backgroundColor: "orange", color: "white" }}>
                    {aqiInfo?.category}
                  </span>
                </p>
              </section>
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
                      <p className="idl-name">
                        <a
                          style={{
                            color: "inherit",
                          }}
                          href={`https://www.google.com/search?q=${elt.name}`}
                          target="_blank"
                        >
                          {elt.name}{" "}
                        </a>
                        (Distance from origin: {calDist?.[elt.name]?.distance},
                        Duration :{calDist?.[elt.name]?.duration} )
                      </p>
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
                      <div>
                        <p
                          style={{
                            color: "rgb(49, 87, 164)",
                            fontSize: "17px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => clickedArea(e)}
                        >
                          {">> "}Show videos of {elt.name}
                        </p>
                        {showAreaVid &&
                          elt.name &&
                          selectedAreaVideo === elt.name && (
                            <ShortsSlider place={elt.name}></ShortsSlider>
                          )}
                      </div>
                      <section>
                        <p
                          style={{
                            color: "rgb(49, 87, 164)",
                            fontSize: "17px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => clickedAreaLodge(e)}
                        >
                          {">> "}Top rated Lodge of {elt.name}
                        </p>
                        {showAreaLodge && selectedVideoLodge === elt.name && (
                          <div style={{ marginLeft: "5%", marginTop: "2%" }}>
                            <p style={{ fontSize: "16px" }}>
                              Check other hotels on the following site:
                            </p>
                            <p className="longe-box-extra">
                              <a
                                style={{
                                  color: "red",
                                  backgroundColor: "yellow",
                                }}
                                href={`https://www.booking.com/searchresults.html?ss=${elt.name}`}
                                target="_blank"
                              >
                                Find Hotels in {elt.name} on Booking.com
                              </a>
                            </p>
                            <p
                              style={{
                                fontSize: "14px",
                                marginBottom: "20px",
                              }}
                            >
                              <a
                                style={{
                                  color: "red",
                                  backgroundColor: "yellow",
                                }}
                                href={`https://www.hotels.com/search.do?q-destination=${elt.name}`}
                                target="_blank"
                              >
                                Search Hotels in {elt.name} on Hotels.com
                              </a>
                            </p>
                          </div>
                        )}
                        {showAreaLodge && selectedVideoLodge === elt.name && (
                          <TopRatedHotels place={elt.name}></TopRatedHotels>
                        )}
                      </section>
                      <section style={{ marginBottom: "2%" }}>
                        <p
                          style={{
                            color: "rgb(49, 87, 164)",
                            fontSize: "17px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => clickedAreaRestaurants(e)}
                        >
                          {">> "}Top rated Restaurants of {elt.name}
                        </p>
                        {showAreaRestaurants &&
                          selectedAreaRestaurant === elt.name && (
                            <span style={{ color: "green" }}>Veg</span>
                          )}

                        {showAreaRestaurants &&
                          selectedAreaRestaurant === elt.name && (
                            <TopRatedVegRestaurants
                              place={elt.name}
                            ></TopRatedVegRestaurants>
                          )}

                        {showAreaRestaurants &&
                          selectedAreaRestaurant === elt.name && (
                            <span style={{ color: "red" }}>Non-Veg</span>
                          )}

                        {showAreaRestaurants &&
                          selectedAreaRestaurant === elt.name && (
                            <TopRatedNonVegRestaurants
                              place={elt.name}
                            ></TopRatedNonVegRestaurants>
                          )}
                      </section>
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
                    <p className="off-name">
                      <a
                        style={{
                          color: "inherit",
                        }}
                        href={`https://www.google.com/search?q=${elt.name}`}
                        target="_blank"
                      >
                        {elt.name}{" "}
                      </a>
                      (Distance from origin: {calDist?.[elt.name]?.distance},
                      Duration :{calDist?.[elt.name]?.duration} )
                    </p>
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
                    <div>
                      <p
                        style={{
                          color: "rgb(49, 87, 164)",
                          fontSize: "17px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => clickedUnderHypedArea(e)}
                      >
                        {">> "}Show videos of {elt.name}
                      </p>
                      {showunderhypedVid &&
                        elt.name &&
                        selectedAreaVideo === elt.name && (
                          <ShortsSlider place={elt.name}></ShortsSlider>
                        )}
                    </div>
                    <section>
                      <p
                        style={{
                          color: "rgb(49, 87, 164)",
                          fontSize: "17px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => clickedUnderHypedAreaLodge(e)}
                      >
                        {">> "}Top rated Lodge of {elt.name}
                      </p>
                      {showunderhypedLodge &&
                        selectedVideoLodge === elt.name && (
                          <div style={{ marginLeft: "5%", marginTop: "2%" }}>
                            <p style={{ fontSize: "16px" }}>
                              Check other hotels on the following site:
                            </p>
                            <p style={{ color: "Orange", fontSize: "14px" }}>
                              <a
                                style={{
                                  color: "red",
                                  backgroundColor: "yellow",
                                }}
                                href={`https://www.booking.com/searchresults.html?ss=${elt.name}`}
                                target="_blank"
                              >
                                Find Hotels in {elt.name} on Booking.com
                              </a>
                            </p>
                            <p
                              style={{
                                fontSize: "14px",
                                marginBottom: "20px",
                              }}
                            >
                              <a
                                style={{
                                  color: "red",
                                  backgroundColor: "yellow",
                                }}
                                href={`https://www.hotels.com/search.do?q-destination=${elt.name}`}
                                target="_blank"
                              >
                                Search Hotels in {elt.name} on Hotels.com
                              </a>
                            </p>
                          </div>
                        )}
                      {showunderhypedLodge &&
                        selectedVideoLodge === elt.name && (
                          <TopRatedHotels place={elt.name}></TopRatedHotels>
                        )}
                    </section>
                    <section style={{ marginBottom: "2%" }}>
                      <p
                        style={{
                          color: "rgb(49, 87, 164)",
                          fontSize: "17px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => clickedUnderHypedAreaRestaurants(e)}
                      >
                        {">> "}Top rated Restaurants of {elt.name}
                      </p>
                      {showunderhypedRestaurants &&
                        selectedAreaRestaurant === elt.name && (
                          <span style={{ color: "green" }}>Veg</span>
                        )}

                      {showunderhypedRestaurants &&
                        selectedAreaRestaurant === elt.name && (
                          <TopRatedVegRestaurants
                            place={elt.name}
                          ></TopRatedVegRestaurants>
                        )}

                      {showunderhypedRestaurants &&
                        selectedAreaRestaurant === elt.name && (
                          <span style={{ color: "red" }}>Non-Veg</span>
                        )}

                      {showunderhypedRestaurants &&
                        selectedAreaRestaurant === elt.name && (
                          <TopRatedNonVegRestaurants
                            place={elt.name}
                          ></TopRatedNonVegRestaurants>
                        )}
                    </section>
                  </div>
                );
              })}
              <section style={{ marginBottom: "30px" }}>
                <p className="prec-text">Budget Overview</p>
                <p className="idl-sub-text">
                  We will evaluate the budget for you - (Minor variations
                  possible.)
                </p>
                <button
                  className="budget-btn"
                  onClick={() => setShowBudgetPopUp((prev) => !prev)}
                >
                  Click here to fetch your budget <PiCursorClickDuotone />
                </button>
                {showBudgetPopUp && (
                  <Budget
                    setShowBudgetPopUp={setShowBudgetPopUp}
                    userBase={userBase}
                    state={state}
                    days={days}
                    setOpen={setOpen}
                    open={open}
                    budget={budget}
                    setBudget={setBudget}
                    tips={tips}
                    setTips={setTips}
                  />
                )}
              </section>
              <p className="prec-text">
                Precautionary Warning <TiWarning style={{ color: "yellow" }} />
              </p>
              <p className="idl-sub-text">
                Stay informed and prepared with essential safety tips for your
                journey.
              </p>
              {note?.split(".").map((e) => {
                return (
                  <div>
                    {e && <FaPlaneCircleExclamation />}
                    <span className="prec-note">{e + e ? e + "." : ""}</span>
                  </div>
                );
              })}
              <span className="prec-note"></span>
            </div>

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

            <div style={{ marginBottom: "5%" }}>
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
            <div className="line"></div>
            <TripResponseReview />
            <div className="line"></div>
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
