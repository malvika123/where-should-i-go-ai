import { useEffect, useState } from "react";
import { TbMeat } from "react-icons/tb";

import axios from "axios";

export const TopRatedNonVegRestaurants = ({ place }) => {
  const [hList, setHList] = useState([]);
  useEffect(() => {
    const getTopRatedNonVegRestaurants = async () => {
      try {
        const data = await axios.get("/api/loc/getTopNonVegRestaurants", {
          params: {
            place: place,
          },
        });
        setHList(data?.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTopRatedNonVegRestaurants();
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
                color: "black",
                border: "solid red 1px",
                backgroundColor: "pink",
                paddingLeft: "1%",
                paddingRight: "1%",
                paddingTop: "1%",
                paddingBottom: "1%",
                borderRadius: "10px",
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
                    color: "red",
                  }}
                >
                  <TbMeat />
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
                <span style={{ color: "red" }}>Address:</span>{" "}
                {elt?.formatted_address}
              </p>
              <p style={{ fontSize: "12px" }}>
                <span style={{ color: "red" }}>Rating:</span> {elt?.rating}
              </p>
              <p style={{ fontSize: "12px" }}>
                <span style={{ color: "red" }}>Total user rating:</span>{" "}
                {elt?.user_ratings_total}
              </p>
            </div>
          );
        })}
    </div>
  );
};
