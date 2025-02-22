import { useEffect, useState } from "react";
import { PiPlantDuotone } from "react-icons/pi";

import axios from "axios";

export const TopRatedVegRestaurants = ({ place }) => {
  const [hList, setHList] = useState([]);
  useEffect(() => {
    const getTopRatedVegRestaurants = async () => {
      try {
        const data = await axios.get("/api/loc/getTopVegRestaurants", {
          params: {
            place: place,
          },
        });
        setHList(data?.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTopRatedVegRestaurants();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "100vw",
        flexWrap: "wrap",
      }}
    >
      {hList &&
        hList.length > 0 &&
        hList.map((elt) => {
          return (
            <div
              style={{
                width: "230px",
                maxHeight: "250px",
                marginRight: "20px",
                backgroundColor: "rgb(165, 198, 135)",
                color: "black",
                paddingLeft: "1%",
                paddingRight: "1%",
                paddingTop: "1%",
                paddingBottom: "1%",
                borderRadius: "10px",
                border: "solid green 1px",
                marginBottom: "1%",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "orange",
                }}
              >
                <a
                  target="_blank"
                  href={`https://www.google.com/maps?q=${elt?.lat},${elt?.lng}`}
                  style={{
                    color: "green",
                  }}
                >
                  <PiPlantDuotone />
                  {"  "}
                  {elt?.name}
                </a>
              </p>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "black",
                  marginBottom: "8px",
                }}
              ></div>
              <p style={{ fontSize: "12px", flexWrap: "wrap" }}>
                <span style={{ color: "green" }}>Address:</span>{" "}
                {elt?.formatted_address}
              </p>
              <p style={{ fontSize: "12px" }}>
                <span style={{ color: "green" }}>Rating:</span> {elt?.rating}
              </p>
              <p style={{ fontSize: "12px" }}>
                <span style={{ color: "green" }}>Total user rating:</span>{" "}
                {elt?.user_ratings_total}
              </p>
            </div>
          );
        })}
    </div>
  );
};
