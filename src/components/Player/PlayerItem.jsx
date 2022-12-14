import styled from "styled-components";

function PlayerItem({ player, isLast }) {
  return (
    <Wrapper isLast={isLast}>
      <h1>{player.name}</h1>
    </Wrapper>
  );
}

export default PlayerItem;

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 80%;
  height: 300px;
  margin-left: 2%;
  margin-right: ${({ isLast }) => isLast && "2%"};
  background-color: pink;
  user-select: none;
`;
