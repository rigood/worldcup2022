import { useState, useRef } from "react";
import styled from "styled-components";
import useDragSlider from "../hook/useDragSlider";
import PlayerItem from "../components/PlayerItem";
import { KOREA_PLAYERS } from "../data/korea-players";
import { ReactComponent as PlayerIcon } from "../svg/player.svg";
import color from "../style/color";

function Players() {
  const [index, setIndex] = useState(0);
  const playerSliderContainerRef = useRef(null);
  const slideWidth = 100;
  const isDragging = useDragSlider(
    playerSliderContainerRef,
    slideWidth,
    index,
    setIndex
  );

  return (
    <Wrapper>
      <TitleContainer>
        <PlayerIcon />
        <h1>대한민국 국가대표</h1>
      </TitleContainer>
      <PlayerSliderContainer ref={playerSliderContainerRef}>
        {KOREA_PLAYERS.map((player) => {
          return <PlayerItem key={player.id} player={player} />;
        })}
      </PlayerSliderContainer>
    </Wrapper>
  );
}

export default Players;

const Wrapper = styled.div`
  width: 100%;
`;

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
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &.dragging {
    scroll-behavior: auto;
    cursor: grab;
  }
`;
