import styled from "styled-components";
import { KOREA_PLAYERS } from "../data/korea-players";
import { ReactComponent as PlayerIcon } from "../svg/player.svg";
import Slider from "../components/Common/Slider";
import PlayerItem from "./../components/Player/PlayerItem";

function Players() {
  const SLIDE_WIDTH = 370;

  return (
    <Wrapper>
      <TitleContainer>
        <PlayerIcon />
        <h1>대한민국 국가대표</h1>
      </TitleContainer>
      <Slider slideWidth={SLIDE_WIDTH}>
        {KOREA_PLAYERS.map((player) => {
          return <PlayerItem key={player.id} player={player} />;
        })}
      </Slider>
    </Wrapper>
  );
}

export default Players;

const Wrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  h1 {
    margin-left: 6px;
    font-size: 15px;
    color: ${({ theme }) => theme.color.primary};
  }
`;
