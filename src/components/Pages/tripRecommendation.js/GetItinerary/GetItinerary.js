import Spinner from "../../tripQuestions/ShowFinalInfo/Spinner";
import ImgSlider from "../ImgSlider";
import SpinnerItinerary from "./SpinnerItinerary";

export const GetItinerary = ({ itineraryObjData, spinning }) => {
  return (
    <div className="getItinerary">
      {!spinning ? (
        itineraryObjData && (
          <div>
            {/* <h1 className="it-headng">Itinerary</h1> */}
            {(() => {
              const elements = [];
              let i = 0;
              for (const key of Object.keys(itineraryObjData)) {
                i++;
                if (key === "precautionary_warning") {
                  elements.push(
                    <div className="it-key-main">
                      <p className="it-key-war">precautionary_warning</p>
                      <p className="precaution">
                        {itineraryObjData?.[key].split(".")?.map((elt) => {
                          return <p className="heading-val">{elt}</p>;
                        })}
                      </p>
                    </div>
                  );
                } else {
                  const keyData =
                    itineraryObjData?.[key]?.["day"] || `Day ${i}`;
                  const keyDestination =
                    itineraryObjData?.[key]?.["destination"];
                  const keyAfternoon = itineraryObjData?.[key]?.["afternoon"];
                  const keyMorning = itineraryObjData?.[key]?.["morning"];
                  const keyEvening = itineraryObjData?.[key]?.["evening"];
                  elements.push(
                    <div className="it-key-main">
                      <p className="it-key">
                        {keyData} :{" "}
                        <span className="it-key-des">{keyDestination}</span>
                      </p>
                      <div className="it-sub-top">
                        <ImgSlider
                          place={keyDestination}
                          showMultipleSlides={1}
                          classnm="ImgSlider-it"
                        />
                        <div className="it-sub">
                          <p className="it-Morn">
                            <span className="heading-it">Morning</span>:{" "}
                            <span className="heading-val">{keyMorning}</span>
                          </p>
                          <p className="it-After">
                            <span className="heading-it">Afternoon</span>:{" "}
                            <span className="heading-val">{keyAfternoon}</span>
                          </p>
                          <p className="it-Eve">
                            <span className="heading-it">Evening</span>:{" "}
                            <span className="heading-val">{keyEvening}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              }
              return elements;
            })()}
          </div>
        )
      ) : (
        <SpinnerItinerary />
      )}
    </div>
  );
};
