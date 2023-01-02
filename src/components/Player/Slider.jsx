import { useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Slider({ children }) {
  const scrollRef = useRef(null);
  const PrevButtonRef = useRef(null);
  const NextButtonRef = useRef(null);

  const isDragStart = useRef(false);
  const isDragging = useRef(false);

  const prevPageX = useRef(0);
  const positionDiff = useRef(0);

  const slideWidthOffsetPercentage = 0.74;

  const handleDragStart = (e) => {
    isDragStart.current = true;
    prevPageX.current = e.pageX;
  };

  const handleDragMove = (e) => {
    if (!isDragStart.current) return;

    e.preventDefault();
    isDragging.current = true;
    scrollRef.current.classList.add("dragging");

    scrollRef.current.scrollLeft -= e.movementX;
    positionDiff.current = e.pageX - prevPageX.current;
  };

  const handleDragEnd = (e) => {
    isDragStart.current = false;

    if (!isDragging.current) return;
    scrollRef.current.classList.remove("dragging");
    isDragging.current = false;

    autoSlide();
  };

  const handleButtonShowHide = (scrollLeftValue) => {
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScrollableWidth = scrollWidth - clientWidth;

    PrevButtonRef.current.style.display = scrollLeftValue > 0 ? "flex" : "none";
    NextButtonRef.current.style.display =
      maxScrollableWidth - scrollLeftValue > 1 ? "flex" : "none";
  };

  const autoSlide = () => {
    const positionDiffAbs = Math.abs(positionDiff.current);

    const slider = scrollRef.current;
    const slideWidthOffset = slider.clientWidth * slideWidthOffsetPercentage;
    const valDiff = slideWidthOffset - positionDiffAbs;

    // 이전 슬라이드 없는 경우 종료
    if (slider.scrollLeft <= 0) return;

    // 다음 슬라이드 없는 경우 종료
    const maxScrollableWidth = slider.scrollWidth - slider.clientWidth;
    if (maxScrollableWidth - slider.scrollLeft < 1) return;

    // 변수 선언
    let scrollLeftWidth;
    const minMovementWidth = 20;

    // 오른쪽으로 스크롤한 경우
    if (positionDiff.current < 0) {
      if (positionDiffAbs > minMovementWidth) {
        scrollLeftWidth = scrollRef.current.scrollLeft += valDiff;
      } else {
        scrollLeftWidth = scrollRef.current.scrollLeft -= positionDiffAbs;
      }
    }

    // 왼쪽으로 스크롤한 경우
    if (positionDiff.current > 0) {
      if (positionDiffAbs > minMovementWidth) {
        scrollLeftWidth = scrollRef.current.scrollLeft -= valDiff;
      } else {
        scrollLeftWidth = scrollRef.current.scrollLeft += positionDiffAbs;
      }
    }

    handleButtonShowHide(scrollLeftWidth);
  };

  const handleButtonClick = (direction) => {
    const slideWidthOffset =
      scrollRef.current.clientWidth * slideWidthOffsetPercentage;
    let scrollLeftWidth;

    if (direction === "prev") {
      scrollLeftWidth = scrollRef.current.scrollLeft -= slideWidthOffset;
    } else if (direction === "next") {
      scrollLeftWidth = scrollRef.current.scrollLeft += slideWidthOffset;
    }

    handleButtonShowHide(scrollLeftWidth);
  };

  return (
    <SliderContainer>
      <PrevButton
        icon={faChevronLeft}
        ref={PrevButtonRef}
        onClick={() => handleButtonClick("prev")}
      />
      <SliderWrapper
        ref={scrollRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {children}
      </SliderWrapper>
      <NextButton
        icon={faChevronRight}
        ref={NextButtonRef}
        onClick={() => handleButtonClick("next")}
      />
    </SliderContainer>
  );
}

export default Slider;

const SliderContainer = styled.div`
  position: relative;
`;

const SliderButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  z-index: 1;
  width: 20px;
  height: 20px;
  padding: 8px;
  color: ${({ theme }) => theme.color.primary};
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  border-radius: 50%;
  cursor: pointer;
`;

const PrevButton = styled(SliderButton)`
  left: 0;
  display: none;
`;

const NextButton = styled(SliderButton)`
  right: 0;
`;

const SliderWrapper = styled.ul`
  display: flex;
  font-size: 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
  &.dragging {
    scroll-behavior: auto;
  }
`;
