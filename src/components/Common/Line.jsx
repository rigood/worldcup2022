import styled from "styled-components";

function Line({ color }) {
  return <Wrapper color={color} />;
}

export default Line;

const Wrapper = styled.div`
  width: 100%;
  height: 1px;
  margin: 15px 0;
  background-color: ${({ color, theme }) =>
    color ? color : theme.color.lightgray};
`;
