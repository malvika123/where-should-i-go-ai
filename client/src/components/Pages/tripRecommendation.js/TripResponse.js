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

const TripResponse = () => {
  const state = useSelector((state) => state?.data?.userData?.state);
  const reasonState = useSelector(
    (state) => state?.data?.userData?.reasonForStateChoice
  );
  const area = useSelector((state) => state?.data?.userData?.area);
  const underhyped = useSelector((state) => state?.data?.userData?.underhyped);
  const note = useSelector((state) => state?.data?.userData?.note);

  const navigate = useNavigate();
  const NavigateTopath = ({ path }) => {
    navigate(path);
  };

  return (
    <div className="trip-res-body">
      <div>
        <TripPlannerHeader notshowSubHeader={true} />
        <div className="trip-res-sub-body">
          <div className="trip-res-sub-body-sub">
            <p className="sub-txt-res">Recommendation based on your choices</p>
            <p className="state-name">{state}</p>
            <div className="line"></div>
            {state && <ImgSlider place={state} showMultipleSlides={4} />}
            <span className="state-reason">{reasonState}</span>
            <p className="idl-text">
              Ideal places to visit <GrMapLocation style={{ color: "pink" }} />
            </p>
            <p className="idl-sub-text">
              Discover the must-see destinations for your next unforgettable
              adventure.
            </p>
            {area.map((elt) => {
              return (
                <div className="idl-places-arr">
                  <p className="idl-name">{elt.name} </p>
                  <p className="idl-desc">{elt.description}</p>
                  {elt.name && (
                    <ImgSlider place={elt.name} showMultipleSlides={4} />
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
            {underhyped.map((elt) => {
              return (
                <div>
                  <p className="off-name">{elt.name} </p>
                  <p className="off-desc">{elt.description}</p>
                  {elt.name && (
                    <ImgSlider place={elt.name} showMultipleSlides={4} />
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
          <div className="line"></div>
          <div>
            <p>
              Happy with the Recommendation? <RiEmotionHappyLine />
            </p>
            <p className="off-desc">
              Happy with the recommendation? Let us take it a step further!
              Explore a tailored itinerary designed to make your trip seamless
              and unforgettable. From must-visit spots to hidden gems, we've got
              your journey mapped out for you.
            </p>
            <button
              className="itnry"
              onClick={() => NavigateTopath({ path: "/itinerary" })}
            >
              Take me to my itinerary
            </button>
          </div>
          <div style={{ marginTop: "5%" }}>
            <p>
              Need a lil more tailoring? <RiScissors2Fill />
            </p>
            <p className="off-desc">
              Not quite there yet? No worries! Let’s fine-tune your preferences
              to find the perfect destination that matches your vision. Share a
              little more about your needs, and we’ll ensure your next
              suggestion is spot-on!
            </p>
            <button className="itnry">lets go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResponse;
