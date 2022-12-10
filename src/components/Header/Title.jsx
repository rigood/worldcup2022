import styled from "styled-components";
import { ReactComponent as Logo } from "../../svg/trophy.svg";

function Title() {
  return (
    <Wrapper>
      <div>
        <Text>WorldCup 2022</Text>
        <SubText>꿈을 현실로 ★ 도전은 계속된다</SubText>
      </div>
      <div>
        <Logo />
      </div>
    </Wrapper>
  );
}

export default Title;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 20px;
`;

const Text = styled.h1`
  font-size: 24px;
  font-weight: bold;
  font-family: "GmarketSansMedium";
  color: white;
`;

const SubText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.color.lightwhite};
`;
