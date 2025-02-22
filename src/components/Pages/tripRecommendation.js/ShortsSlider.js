import { useEffect, useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import "./style/tripResponse.css";
import "./style/shorts.css";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

export const ShortsSlider = ({ place }) => {
  const [shorts, setShorts] = useState([]);
  const [showVid, setShowVid] = useState(false);
  const isMidScreen = useMediaQuery({ query: "(max-width: 1040px)" });
  const ismidLargeScreen = useMediaQuery({
    query: "(max-width: 1360px)",
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 690px)" });
  const isVSmallScreen = useMediaQuery({ query: "(max-width: 570px)" });
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
    <div style={{ marginLeft: "3%", flexWrap: "wrap" }}>
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
              <div className="shorts">
                <iframe
                  width={
                    isVSmallScreen
                      ? "80"
                      : isSmallScreen
                      ? "110"
                      : isMidScreen
                      ? "150"
                      : ismidLargeScreen
                      ? "220"
                      : "250"
                  }
                  height={
                    isVSmallScreen
                      ? "90"
                      : isSmallScreen
                      ? "100"
                      : isMidScreen
                      ? "130"
                      : ismidLargeScreen
                      ? "210"
                      : "250"
                  }
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
