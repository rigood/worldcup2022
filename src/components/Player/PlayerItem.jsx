import styled from "styled-components";

function PlayerItem({ player, isLast }) {
  return (
    <Wrapper isLast={isLast}>
      <Player>
        <img
          src={process.env.PUBLIC_URL + `/assets/img/players/${player.id}.png`}
        />
      </Player>
    </Wrapper>
  );
}

export default PlayerItem;

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 80%;
  margin-left: 2%;
  margin-right: ${({ isLast }) => isLast && "2%"};
  background-color: ${({ theme }) => theme.color.lightprimary};
  user-select: none;
`;

const Player = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    max-width: 400px;
    object-fit: cover;
  }
`;
