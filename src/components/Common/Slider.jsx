import { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Slider({ children, slideWidth }) {
  const [isDrag, setIsDrag] = useState(false);
  const scrollRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);

  const handleButtonDisplay = (scrollLeftWidth) => {
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScrollableWidth = scrollWidth - clientWidth;

    leftButtonRef.current.style.display = scrollLeftWidth > 0 ? "flex" : "none";
    rightButtonRef.current.style.display =
      maxScrollableWidth - scrollLeftWidth > 1 ? "flex" : "none";
  };

  const handleButtonClick = (direction) => {
    let scrollLeftWidth;

    if (direction === "left") {
      scrollLeftWidth = scrollRef.current.scrollLeft -= slideWidth;
    } else if (direction === "right") {
      scrollLeftWidth = scrollRef.current.scrollLeft += slideWidth;
    }

    handleButtonDisplay(scrollLeftWidth);
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const handleDragMove = (e) => {
    if (!isDrag) return;
    scrollRef.current.scrollLeft -= e.movementX;
    handleButtonDisplay(scrollRef.current.scrollLeft);
  };

  const handleDragEnd = (e) => {
    setIsDrag(false);
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
        onMouseMove={isDrag ? handleDragMove : null}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className={isDrag ? "dragging" : null}
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
  overflow-x: hidden;
  scroll-behavior: smooth;

  &.dragging {
    scroll-behavior: auto;
    cursor: grab;
  }
`;
