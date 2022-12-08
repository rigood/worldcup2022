import { useState, useRef } from "react";
import styled from "styled-components";
import color from "../style/color";
import { KOREA_PLAYERS } from "../data/korea-players";
import PlayerItem from "../components/PlayerItem";
import { ReactComponent as PlayerIcon } from "../svg/player.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Players() {
  const [isDrag, setIsDrag] = useState(false);
  const scrollRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const SLIDE_OFFSET = 370;

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
      scrollLeftWidth = scrollRef.current.scrollLeft -= SLIDE_OFFSET;
    } else if (direction === "right") {
      scrollLeftWidth = scrollRef.current.scrollLeft += SLIDE_OFFSET;
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
    <Wrapper>
      <TitleContainer>
        <PlayerIcon />
        <h1>대한민국 국가대표</h1>
      </TitleContainer>
      <SliderContainer>
        <LeftButton
          icon={faChevronLeft}
          ref={leftButtonRef}
          onClick={() => handleButtonClick("left")}
        />
        <PlayerSliderContainer
          ref={scrollRef}
          onMouseDown={handleDragStart}
          onMouseMove={isDrag ? handleDragMove : null}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className={isDrag ? "dragging" : null}
        >
          {KOREA_PLAYERS.map((player) => {
            return <PlayerItem key={player.id} player={player} />;
          })}
        </PlayerSliderContainer>
        <RightButton
          icon={faChevronRight}
          ref={rightButtonRef}
          onClick={() => handleButtonClick("right")}
        />
      </SliderContainer>
    </Wrapper>
  );
}

export default Players;

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
  color: ${color.primary};
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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

const Wrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  h1 {
    margin-left: 6px;
    font-size: 15px;
    color: ${color.primary};
  }
`;

const PlayerSliderContainer = styled.ul`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;

  &.dragging {
    scroll-behavior: auto;
    cursor: grab;
  }
`;
