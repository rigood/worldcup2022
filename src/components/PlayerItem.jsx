import styled from "styled-components";
import color from "../style/color";

function PlayerItem({ player }) {
  return (
    <PlayerContainer className="player-card-wrapper">
      <Profile bgImg={player.img}>
        <Number>{player.number}</Number>
        <ProfileInfo>
          <a
            href={player.instagram}
            title={`${player.name} 선수 Instagram 바로가기`}
            target="_blank"
          >
            <h2 className="name">{player.name}</h2>
          </a>
          <div className="club">{player.club}</div>
        </ProfileInfo>
      </Profile>
      <InfoGrid>
        <label>나이</label>
        <label>포지션</label>
        <label>체격</label>
        <span>{player.age}세</span>
        <span>{player.position}</span>
        <span>
          {player.height}cm / {player.weight}kg
        </span>
      </InfoGrid>
    </PlayerContainer>
  );
}

export default PlayerItem;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const Profile = styled.div`
  width: 360px;
  height: 400px;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 1)),
    url(${({ bgImg }) => bgImg});
  position: relative;
  margin-bottom: 40px;
  user-select: none;
`;

const ProfileInfo = styled.div`
  position: absolute;
  bottom: 30px;
  right: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    font-size: 32px;
    font-weight: 700;
    color: ${color.primary};
    margin-bottom: 8px;
  }
`;

const Number = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${color.primary};
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 3fr;
  justify-items: center;
  column-gap: 10px;
  row-gap: 10px;
  label {
    color: ${color.blue};
  }
  user-select: none;
`;
