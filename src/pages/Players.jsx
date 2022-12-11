import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KOREA_PLAYERS } from "../data/korea-players";
import TitleContainer from "../components/Common/TitleContainer";
import Slider from "../components/Common/Slider";
import PlayerItem from "./../components/Player/PlayerItem";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

function Players() {
  return (
    <>
      <TitleContainer>
        <FontAwesomeIcon icon={faTrophy} />
        <h2>대한민국 국가대표</h2>
      </TitleContainer>

      <Slider>
        {KOREA_PLAYERS.map((player) => {
          return <PlayerItem key={player.id} player={player} />;
        })}
      </Slider>
    </>
  );
}

export default Players;
