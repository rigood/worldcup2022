import { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Slider({ children }) {
  const scrollRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);

  const isDragStart = useRef(false);
  const isDragging = useRef(false);

  const prevPageX = useRef(0);
  const positionDiff = useRef(0);

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
    scrollRef.current.classList.remove("dragging");

    if (!isDragging.current) return;
    isDragging.current = false;

    autoSlide();
    handleButtonShowHide(scrollRef.current.scrollLeft);
  };

  const handleButtonShowHide = (scrollLeftValue) => {
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScrollableWidth = scrollWidth - clientWidth;

    leftButtonRef.current.style.display = scrollLeftValue > 0 ? "flex" : "none";
    rightButtonRef.current.style.display =
      maxScrollableWidth - scrollLeftValue > 1 ? "flex" : "none";
  };

  const autoSlide = () => {
    const positionDiffAbs = Math.abs(positionDiff.current);
    const slideWidth = scrollRef.current.clientWidth;
    const valDiff = slideWidth - positionDiffAbs;

    // 오른쪽으로 스크롤한 경우
    if (positionDiff.current < 0) {
      if (positionDiffAbs > slideWidth / 4) {
        scrollRef.current.scrollLeft += valDiff;
      } else {
        scrollRef.current.scrollLeft -= positionDiffAbs;
      }
    }

    // 왼쪽으로 스크롤한 경우
    if (positionDiff.current > 0) {
      if (positionDiffAbs > slideWidth / 4) {
        scrollRef.current.scrollLeft -= valDiff;
      } else {
        scrollRef.current.scrollLeft += positionDiffAbs;
      }
    }
  };

  const handleButtonClick = (direction) => {
    const slideWidth = scrollRef.current.clientWidth;
    let scrollLeftWidth;

    if (direction === "left") {
      scrollLeftWidth = scrollRef.current.scrollLeft -= slideWidth;
    } else if (direction === "right") {
      scrollLeftWidth = scrollRef.current.scrollLeft += slideWidth;
    }

    handleButtonShowHide(scrollLeftWidth);
  };

  return (
    <SliderContainer>
      <LeftButton
        icon={faChevronLeft}
        ref={leftButtonRef}
        onClick={() => handleButtonClick("left")}
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
      <RightButton
        icon={faChevronRight}
        ref={rightButtonRef}
        onClick={() => handleButtonClick("right")}
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

const LeftButton = styled(SliderButton)`
  left: 0;
  display: none;
`;

const RightButton = styled(SliderButton)`
  right: 0;
`;

const SliderWrapper = styled.ul`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;

  &.dragging {
    scroll-behavior: auto;
  }
`;
