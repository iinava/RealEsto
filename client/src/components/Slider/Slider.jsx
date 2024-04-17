import { useState } from "react";
import "./slider.scss";
import arrow from "../Slider/arrow.png";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (images && images.length > 0) {
      if (direction === "left") {
        if (imageIndex === 0) {
          setImageIndex(images.length - 1);
        } else {
          setImageIndex(imageIndex - 1);
        }
      } else {
        if (imageIndex === images.length - 1) {
          setImageIndex(0);
        } else {
          setImageIndex(imageIndex + 1);
        }
      }
    }
  };

  return (
    <div className="slider">
      {images && images.length > 0 && imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src={arrow} alt="" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src={arrow} className="right" alt="" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      {images && images.length > 0 ? (
        <>
          <div className="bigImage">
            <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
          </div>
          <div className="smallImages">
            {images.slice(1).map((image, index) => (
              <img
                src={image}
                alt=""
                key={index}
                onClick={() => setImageIndex(index + 1)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center w-full h-full text-2xl">🥲No images available</div>
      )}
    </div>
  );
}

export default Slider;
