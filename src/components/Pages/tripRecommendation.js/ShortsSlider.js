import { useEffect, useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import "./style/tripResponse.css";
import axios from "axios";

export const ShortsSlider = ({ place }) => {
  const [shorts, setShorts] = useState([]);
  const [showVid, setShowVid] = useState(false);
  useEffect(() => {
    const getShorts = async () => {
      try {
        const data = await axios.get("/api/loc/getShorts", {
          params: {
            place: place,
          },
        });
        if (data?.data !== "404 bad req") {
          setShorts(data?.data);
          setShowVid(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getShorts();
  }, [place]);

  return (
    <div style={{ marginLeft: "3%" }}>
      {!showVid && (
        <span>
          No videos available today as we ran out of daily quota, please try
          tomorrow {showVid} {shorts}
        </span>
      )}
      {showVid && shorts && shorts?.length > 0 && (
        <span>We have few videos for you</span>
      )}
      <div className="ImgSlider">
        {showVid &&
          shorts &&
          shorts?.length > 0 &&
          shorts.map((elt) => {
            return (
              <div
                style={{
                  marginRight: "30px",
                  borderRadius: "20px !important",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <iframe
                  width="260"
                  height="215"
                  src={`https://www.youtube.com/embed/${elt}?controls=0&showinfo=0&rel=0&controls=0&modestbranding=1`}
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            );
          })}
      </div>
    </div>
  );
};
