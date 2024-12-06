import { useSelector } from "react-redux";
import TripPlannerHeader from "../../Header/TripPlannerHeader";
import "./style/tripResponse.css";
import { useEffect, useState } from "react";
import ImgSlider from "./ImgSlider";

const TripResponse = () => {
  const state = useSelector((state) => state?.data?.userData?.state);
  const reasonState = useSelector((state) => state?.data?.userData?.reason);

  const area = useSelector((state) => state?.data?.userData?.area);
  const underhyped = useSelector((state) => state?.data?.userData?.underhyped);
  const note = useSelector((state) => state?.data?.userData?.note);

  return (
    <div className="trip-res-body">
      <div>
        <TripPlannerHeader notshowSubHeader={true} />
        <div className="trip-res-sub-body">
          <p className="sub-txt-res">Recommendation based on your choices</p>
          <p className="state-name">{state}</p>
          <div className="line"></div>
          {state && <ImgSlider place={state} showMultipleSlides={8} />}
          <p className="state-reason">{reasonState}</p>
          <p className="idl-text">Ideal places to visit</p>
          <p className="idl-sub-text">
            Discover the must-see destinations for your next unforgettable
            adventure.
          </p>
          {area.map((elt) => {
            return (
              <div>
                <p className="idl-name">{elt.name} </p>
                <p className="idl-desc">{elt.description}</p>
                {elt.name && (
                  <ImgSlider place={elt.name} showMultipleSlides={8} />
                )}
              </div>
            );
          })}
          <p className="offbeat-text">Off beat places</p>
          <p className="idl-sub-text">
            Explore hidden gems and unique destinations off the beaten path.
          </p>
          {underhyped.map((elt) => {
            return (
              <div>
                <p className="off-name">{elt.name} </p>
                <p className="off-desc">{elt.description}</p>
                {elt.name && (
                  <ImgSlider place={elt.name} showMultipleSlides={8} />
                )}
              </div>
            );
          })}
          <p className="prec-text">Precautionary Warning</p>
          <p className="idl-sub-text">
            Stay informed and prepared with essential safety tips for your
            journey.
          </p>
          <span className="prec-note">{note}</span>
        </div>
      </div>
    </div>
  );
};

export default TripResponse;
