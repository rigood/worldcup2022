import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import useSlider from "../../hook/useSlider";
import { tabs } from "./../../data/tabs";
import { desktop } from "../../style/responsive";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";

function Header1({ tabIndex, setTabIndex }) {
  const tabContainerRef = useRef(null);
  useSlider(tabContainerRef);

  const handleTabClick = (index) => setTabIndex(index);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title onClick={() => handleTabClick(1)}>카타르월드컵</Title>
          <SubTitle>꿈을 현실로 ★ 도전은 계속된다</SubTitle>
        </Left>
        <Center>
          <TabContainer ref={tabContainerRef}>
            {tabs.map((tab) => (
              <TabItem
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={tabIndex === tab.id && "selected"}
              >
                {tab.name}
              </TabItem>
            ))}
          </TabContainer>
        </Center>
        <Right>
          <Icon>
            <SportsSoccerRoundedIcon style={{ color: "white" }} />
          </Icon>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Header1;

const Container = styled.header`
  width: 100%;
  height: 80px;
  background-color: #8a1538;
  position: fixed;
  top: 0;
  ${desktop({ height: "140px" })}
  z-index: 1;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Left = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-family: "ghanachoco";
  color: white;
  font-size: 28px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
`;

const SubTitle = styled.div`
  display: none;
  position: absolute;
  left: 0;
  bottom: -20px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-family: "Pretendard";
  padding: 0 10px;
  ${desktop({ display: "block" })}
`;

const Center = styled.div`
  ${desktop({ order: 1, width: "100%" })}
`;

const TabContainer = styled.nav`
  display: flex;
  ${desktop({ justifyContent: "space-between" })};
  ${desktop({ overflow: "hidden" })};
`;

const TabItem = styled.span`
  color: rgba(255, 255, 255, 0.85);
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  &:not(:last-child) {
    margin-right: 30px;
  }
  cursor: pointer;
  position: relative;
  padding: 0 5px;
  white-space: nowrap;
  user-select: none;

  &.selected {
    color: white;
    &::after {
      width: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    background-color: #febf10;
    width: 0%;
    height: 2px;
    left: 0;
    bottom: -10px;
    transition: 0.3s;
  }

  @media (hover: hover) {
    &:hover {
      color: white;
    }
    &:hover::after {
      width: 100%;
    }
  }
`;

const Right = styled.div``;

const bounce = keyframes`
  0%,
  25%,
  50%,
  75%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-18px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const Icon = styled.div`
  cursor: pointer;
  padding: 10px;
  position: relative;
  bottom: -3px;

  @media (hover: hover) {
    &:hover {
      animation: ${bounce} 1.5s infinite;
    }
  }
`;
