import { useEffect, useState } from "react";
import { MdOutlineLocalHotel } from "react-icons/md";

import axios from "axios";

export const TopRatedHotels = ({ place }) => {
  const [hList, setHList] = useState([]);
  useEffect(() => {
    const getTopRatedHotels = async () => {
      try {
        const data = await axios.get("/api/loc/getTopRatedHotels", {
          params: {
            place: place,
          },
        });
        setHList(data?.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTopRatedHotels();
  }, []);

  return (
    <div className="longe-box">
      {hList &&
        hList?.length > 0 &&
        hList?.map((elt) => {
          return (
            <div className="longe-box-main">
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
                    color: "yellow",
                  }}
                >
                  <MdOutlineLocalHotel />

                  {"  "}
                  {elt?.name}
                </a>
              </p>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "white",
                  marginBottom: "8px",
                }}
              ></div>
              <p style={{ fontSize: "12px", flexWrap: "wrap" }}>
                <span style={{ color: "pink" }}>Address:</span>{" "}
                {elt?.formatted_address}
              </p>
              <p style={{ fontSize: "12px" }}>
                <span style={{ color: "pink" }}>Rating:</span> {elt?.rating}
              </p>
              <p style={{ fontSize: "12px" }}>
                <span style={{ color: "pink" }}>Total user rating:</span>{" "}
                {elt?.user_ratings_total}
              </p>
            </div>
          );
        })}
    </div>
  );
};
