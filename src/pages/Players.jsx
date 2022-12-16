import styled from "styled-components";
import { KOREA_PLAYERS } from "../data/korea-players";
import Title from "../components/Common/Title";
import Slider from "../components/Common/Slider";
import PlayerItem from "./../components/Player/PlayerItem";

function Players() {
  return (
    <Wrapper>
      <Title>대한민국 국가대표</Title>

      <Slider>
        {KOREA_PLAYERS.map((player, index) => {
          return (
            <PlayerItem
              key={player.id}
              player={player}
              isLast={index + 1 === KOREA_PLAYERS.length}
            />
          );
        })}
      </Slider>
    </Wrapper>
  );
}

export default Players;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;
