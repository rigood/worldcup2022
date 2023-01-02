import styled from "styled-components";
import MainSlider from "./MainSlider";
import { mobile } from "./../../style/responsive";

function Hero() {
  return (
    <Container>
      <Wrapper>
        <Title>FIFA 카타르 월드컵 2022 특집</Title>
        <SliderWrapper>
          <MainSlider />
        </SliderWrapper>
      </Wrapper>
    </Container>
  );
}

export default Hero;

const Container = styled.div`
  width: 100%;
  height: 60vh;
  background: linear-gradient(to bottom, #4a1124, #8a173a);
`;

const Wrapper = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: white;
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 28px;
  letter-spacing: -0.5px;
  padding: 40px 0px;
  text-align: center;
  ${mobile({ fontSize: "18px", padding: "20px 0px" })}
`;

const SliderWrapper = styled.div`
  height: 100%;
`;
