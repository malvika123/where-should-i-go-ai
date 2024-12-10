export const GetItinerary = ({ itineraryObjData }) => {
  console.log(itineraryObjData, "kio");
  return (
    <div className="getItinerary">
      {itineraryObjData ? (
        <div>
          <h1>Itinerary</h1>
          {(() => {
            const elements = [];
            for (const key of Object.keys(itineraryObjData)) {
              const keyData = key;
              const keyDestination = itineraryObjData.key?.destination;
              const keyAfternoon = itineraryObjData?.[key]?.["afternoon"];
              const keyMorning = itineraryObjData?.[key]?.["morning"];
              const keyEvening = itineraryObjData?.[key]?.["evening"];
              console.log("op", keyData, keyDestination);
              elements.push(
                <div className="it-key-main">
                  <p className="it-key">
                    {keyData} : {keyDestination}
                  </p>
                  <div className="it-sub">
                    <p className="it-Morn">Morning: {keyMorning}</p>
                    <p className="it-After">Afternoon: {keyAfternoon}</p>
                    <p className="it-Eve">Evening: {keyEvening}</p>
                  </div>
                </div>
              );
            }
            return elements;
          })()}
        </div>
      ) : null}
    </div>
  );
};
