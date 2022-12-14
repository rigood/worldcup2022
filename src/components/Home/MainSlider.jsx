import { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mobile } from "../../style/responsive";
import { photos } from "../../data/mainslider-photos";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// import useMainSlider from "../../hook/useMainSlider";

function getNewArray(arr) {
  const firstSlide = arr[0];
  const lastSlide = arr[arr.length - 1];
  const newArray = [lastSlide, ...arr, firstSlide];
  return newArray;
}

function MainSlider() {
  const originalArrayLength = photos.length;
  const originalArrayStartIdx = 1;
  const originalArrayEndIdx = originalArrayLength;

  const newArray = getNewArray(photos);

  const [slideIndex, setSlideIndex] = useState(originalArrayStartIdx);
  const [slideTransition, setSlideTransition] = useState(
    "transform 500ms ease-in-out"
  );

  const moveToSlideWithoutTransition = (index) => {
    setTimeout(() => {
      setSlideIndex(index);
      setSlideTransition("");
    }, 500);
  };

  const handlePrevClick = () => {
    setSlideIndex((prev) => prev - 1);
    setSlideTransition("transform 500ms ease-in-out");

    if (slideIndex === originalArrayStartIdx) {
      moveToSlideWithoutTransition(originalArrayEndIdx);
    }
  };

  const handleNextClick = () => {
    setSlideIndex((prev) => prev + 1);
    setSlideTransition("transform 500ms ease-in-out");

    if (slideIndex === originalArrayEndIdx) {
      moveToSlideWithoutTransition(originalArrayStartIdx);
    }
  };

  const handleDotClick = (index) => {
    setSlideIndex(index);
    setSlideTransition("transform 500ms ease-in-out");
  };

  // 마우스, 터치 이벤트 적용
  const startX = useRef(null);

  const handleStart = (e) => {
    startX.current = e.pageX || e.touches[0].pageX;
  };

  const handleStop = (e) => {
    const endX = e.pageX || e.changedTouches[0].pageX;
    const diff = endX - startX.current;

    if (diff > 0) {
      handlePrevClick();
    } else if (diff < 0) {
      handleNextClick();
    }
  };

  // useMainSlider 커스텀훅을 사용할 경우
  // 리렌더링 되면서 slideIndex가 1로 초기화되는 문제가 발생하여 무한슬라이드 적용 불가 -> 주석처리
  // const sliderRef = useRef();
  // useMainSlider(sliderRef, handlePrevClick, handleNextClick);

  return (
    <>
      <SlideContainer>
        <Arrow direction="left" onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Arrow>
        <SlideWrapper
          onTouchStart={handleStart}
          onTouchEnd={handleStop}
          onMouseDown={handleStart}
          onMouseUp={handleStop}
          // ref={sliderRef}
          slideIndex={slideIndex}
          style={{
            transform: `translateX(-${slideIndex * 100}%)`,
            transition: `${slideTransition}`,
          }}
        >
          {newArray.map((photo, index) => (
            <Slide key={index}>
              <Img
                src={process.env.PUBLIC_URL + `/assets/img/slider/${photo.img}`}
              />
              <ImgOverlay />
              <ImgDesc>{photo.desc}</ImgDesc>
            </Slide>
          ))}
        </SlideWrapper>
        <Arrow direction="right" onClick={handleNextClick}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Arrow>
        <DotContainer>
          {photos.map((dot, index) => (
            <Dot
              key={index}
              className={index === slideIndex - 1 && "selected"}
              onClick={() => handleDotClick(index + 1)}
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
    background-color: white;
  }
`;
