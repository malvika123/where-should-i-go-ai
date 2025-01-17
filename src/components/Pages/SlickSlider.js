import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vid from "../images/3002391-hd_1920_1080_25fps.mp4";
import vid2 from "../images/3015510-hd_1920_1080_24fps.mp4";
import img1 from "../images/photo-1469854523086-cc02fe5d8800.avif";
import img2 from "../images/photo-1489493585363-d69421e0edd3.avif";
import img3 from "../images/photo-1501555088652-021faa106b9b.avif";
import img4 from "../images/photo-1498503182468-3b51cbb6cb24.avif";
import img5 from "../images/photo-1465188162913-8fb5709d6d57.avif";
import img6 from "../images/photo-1531983598325-a62c7a407251.avif";
import img7 from "../images/photo-1525610553991-2bede1a236e2.avif";
import img8 from "../images/photo-1509529711801-deac231925ac.avif";
import vid3 from "../images/185726-876210695_small.mp4";

import "./style/LandingPage.css";

const SlickSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    img1,
    img2,
    vid3,
    img3,
    img4,
    vid,
    img5,
    img6,
    vid2,
    img7,
    img8,
  ];

  return (
    <div className="slickSlider-div">
      <Slider {...settings} className="slickSlider-div-slider">
        {images.map((image, index) => (
          <div key={index}>
            {image.includes("mp4") ? (
              <video className="slickSlider" autoPlay loop muted>
                <source src={image} type="video/mp4" />
              </video>
            ) : (
              <img
                src={image}
                alt={`AI-powered Travel guide planner recommending destinations ${
                  index + 1
                }`}
                className="slickSlider"
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;
