import styled from "styled-components";

function TitleContainer({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default TitleContainer;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  svg {
    color: ${({ theme }) => theme.color.primary};
    margin-right: 7.5px;
  }
  h2 {
    font-size: 18px;
    font-family: "GmarketSansMedium";
    color: ${({ theme }) => theme.color.primary};
    position: relative;
    bottom: -2px;
  }
`;
