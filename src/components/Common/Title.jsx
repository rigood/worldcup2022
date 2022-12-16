import styled from "styled-components";

function Title({ children }) {
  return (
    <Wrapper>
      <h2>{children}</h2>
    </Wrapper>
  );
}

export default Title;

const Wrapper = styled.div`
  margin-bottom: 20px;
  h2 {
    font-size: 24px;
    font-family: "Pretendard";
    font-weight: 600;
  }
`;
