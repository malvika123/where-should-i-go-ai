import { useEffect, useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import "./style/tripResponse.css";
import axios from "axios";

const ImgSlider = ({ place, showMultipleSlides }) => {
  const [imageArr, setImageArr] = useState([]);
  const [currIndex, setCurrImgIndex] = useState(0);
  const [currImg, setCurrImg] = useState(imageArr[0]);

  const incImgIndex = () => {
    const num = currIndex >= imageArr.length - 1 ? currIndex : currIndex + 1;
    setCurrImgIndex(num);
  };

  const decImgIndex = () => {
    const num = currIndex <= 0 ? currIndex : currIndex - 1;
    setCurrImgIndex(num);
  };
  useEffect(() => {
    setCurrImg(imageArr[currIndex]);
  }, [currIndex]);

  useEffect(() => {
    const res = async () => {
      const data = await axios.post(
        "/getImages/image",
        {
          place: place,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const urls = data?.data?.urls;
      console.log(urls);
      setImageArr(urls);
    };
    res();
  }, []);

  return (
    <div>
      {!showMultipleSlides ? (
        <div className="ImgSlider">
          <p onClick={() => decImgIndex()}>
            <CiCircleChevLeft className="leftbutton" />
          </p>
          <img className="images" src={currImg}></img>
          <p onClick={() => incImgIndex()}>
            <CiCircleChevRight className="rightbutton" />
          </p>
        </div>
      ) : (
        <div className="ImgSlider">
          <p onClick={() => decImgIndex()}>
            <CiCircleChevLeft className="leftbutton" />
          </p>
          <div className="wrapper-img">
            {(() => {
              const elements = [];
              for (
                let i = 0;
                i < showMultipleSlides &&
                currIndex < imageArr.length - 3 &&
                currIndex >= 0;
                i++
              ) {
                elements.push(
                  <div className="img-card">
                    <a href={imageArr[i + currIndex]?.img} target="_blank">
                      <img
                        className="images2"
                        src={imageArr[i + currIndex]?.img}
                      ></img>
                    </a>
                    <p className="img-desc">{imageArr[i + currIndex]?.desc}</p>
                  </div>
                );
              }
              return elements;
            })()}
          </div>
          <p onClick={() => incImgIndex()}>
            <CiCircleChevRight className="rightbutton" />
          </p>
        </div>
      )}
    </div>
  );
};

export default ImgSlider;
