import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mobile } from "./../../style/responsive";
import { photos } from "../../data/photos";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function MainSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : photos.length - 1);
    } else {
      setSlideIndex(slideIndex < photos.length - 1 ? slideIndex + 1 : 0);
    }
  };

  const handleDotClick = (index) => setSlideIndex(index);

  return (
    <>
      <SlideContainer>
        <Arrow direction="left" onClick={() => handleArrowClick("left")}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Arrow>
        <SlideWrapper slideIndex={slideIndex}>
          {photos.map((photo) => (
            <Slide key={photo.id}>
              <Img
                src={process.env.PUBLIC_URL + `/assets/img/slider/${photo.img}`}
              />
              <ImgOverlay />
              <ImgDesc>{photo.desc}</ImgDesc>
            </Slide>
          ))}
        </SlideWrapper>
        <Arrow direction="right" onClick={() => handleArrowClick("right")}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Arrow>
        <DotContainer>
          {Array.from({ length: photos.length }).map((dot, index) => (
            <Dot
              key={index}
              className={slideIndex === index && "selected"}
              onClick={() => handleDotClick(index)}
            ></Dot>
          ))}
        </DotContainer>
      </SlideContainer>
    </>
  );
}

export default MainSlider;

const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Arrow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ direction }) => direction === "left" && "10px"};
  right: ${({ direction }) => direction === "right" && "10px"};
  margin: auto;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 1;
  svg {
    font-size: 50px;
  }
`;

const SlideWrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${({ slideIndex }) => slideIndex * -100}%);
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.7)
  );
`;

const ImgDesc = styled.p`
  position: absolute;
  bottom: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  color: white;
  font-family: "Pretendard";
  font-size: 28px;
  ${mobile({ fontSize: "18px" })}
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ width: "50%" })}
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  &.selected {
    width: 14px;
    height: 14px;
    background-color: white;
  }
`;
