import styled from "styled-components";
import color from "../style/color";
import { ReactComponent as Logo } from "../svg/trophy.svg";

function Header() {
  return (
    <Wrapper>
      <Col>
        <Title>WorldCup 2022</Title>
        <SubTitle>꿈을 현실로 ★ 도전은 계속된다</SubTitle>
      </Col>
      <Col>
        <Logo />
      </Col>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.section`
  padding: 20px 20px 10px;
  display: flex;
  justify-content: space-between;
  background-color: ${color.primary};
`;

const Col = styled.div``;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
`;

const SubTitle = styled.h2`
  font-size: 12px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.5);
  font-family: "Pretendard-Regular";
`;
