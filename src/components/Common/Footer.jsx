import {
  GitHub,
  LinkedIn,
  Mail,
  Phone,
  Room,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import styled from "styled-components";
import { tablet } from "../../style/responsive";

function Footer() {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>Rigood.</Logo>
          <Desc>
            개인 포트폴리오용으로 제작된 사이트입니다. <br />
            This website is built for portfolio.
          </Desc>
          <SocialContainer>
            <SocialIcon
              color="#000000"
              href="https://github.com/rigood"
              title="깃허브"
            >
              <GitHub />
            </SocialIcon>
            <SocialIcon
              color="#0a63bc"
              href="https://github.com/rigood"
              title="링크드인"
            >
              <LinkedIn />
            </SocialIcon>
            <SocialIcon
              color="#f31c1b"
              href="https://github.com/rigood"
              title="유튜브"
            >
              <YouTube />
            </SocialIcon>
            <SocialIcon
              color="#1c9cea"
              href="https://github.com/rigood"
              title="트위터"
            >
              <Twitter />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: "10px", color: "white" }} />
            Incheon, South Korea
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: "10px", color: "white" }} />
            010-1234-5678
          </ContactItem>
          <ContactItem>
            <Mail style={{ marginRight: "10px", color: "white" }} />
            rigood@naver.com
          </ContactItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  width: 100%;
  background-color: #8a1538;

  h2::selection,
  p::selection,
  div::selection {
    background-color: #febf10;
    color: black;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  align-items: center;
  ${tablet({ flexDirection: "column", padding: "40px 10px" })}
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  ${tablet({ alignItems: "center", marginBottom: "50px" })}
`;

const Logo = styled.h2`
  color: white;
  font-size: 28px;
  font-family: "ghanachoco";
`;

const Desc = styled.p`
  margin: 20px 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  font-family: "Pretendard";
  font-weight: 300;
  white-space: pre-line;
  letter-spacing: 0.5px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  transition: all 0.3s ease;
  @media (hover: hover) {
    &:hover {
      background-color: ${({ color }) => color};
    }
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${tablet({ alignItems: "center" })}
`;

const Title = styled.h2`
  color: white;
  font-size: 18px;
  font-family: "Pretendard";
  font-weight: 700;
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  display: flex;
  align-items: center;
  font-family: "Pretendard";
  font-weight: 300;
  color: white;
  font-size: 14px;
  letter-spacing: 1px;
`;
