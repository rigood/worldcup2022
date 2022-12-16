import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import useSlider from "../../hook/useSlider";
import { tabs } from "../../data/tabs";
import { desktop, tablet, mobile, fold } from "../../style/responsive";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";

function Header({ tabIndex, setTabIndex }) {
  const tabContainerRef = useRef(null);
  useSlider(tabContainerRef);

  const handleTabClick = (index) => setTabIndex(index);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title onClick={() => handleTabClick(1)}>World Cup 2022</Title>
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
            <SportsSoccerRoundedIcon style={{ color: "#8a173a" }} />
          </Icon>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  width: 100%;
  height: 120px;
  position: fixed;
  top: 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  z-index: 9999;
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
  font-family: "GhanaChocolate";
  color: #8a173a;
  font-size: 32px;
  letter-spacing: -1px;
  cursor: pointer;
  user-select: none;
  ${tablet({ fontSize: "28px" })}
  ${mobile({ fontSize: "24px" })}
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
  font-family: "Pretendard";
  font-size: 18px;
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
    color: #8a173a;
    &::after {
      width: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    background-color: #8a173a;
    width: 0%;
    height: 3px;
    left: 0;
    bottom: -10px;
    transition: 0.3s;
  }

  @media (hover: hover) {
    &:hover {
      color: #8a173a;
    }
    &:hover::after {
      width: 100%;
    }
  }

  ${mobile({ fontSize: "16px" })}
`;

const Right = styled.div`
  ${fold({ display: "none" })}
`;

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
  position: relative;
  bottom: -3px;

  @media (hover: hover) {
    &:hover {
      animation: ${bounce} 1.5s infinite;
    }
  }
`;
