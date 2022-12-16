import { useState, useEffect } from "react";
import styled from "styled-components";
import { getLocalDateTime } from "../../utils/getLocalDateTime";
import Title from "../Common/Title";
import TimeItem from "./TimeItem";
import { mobile } from "./../../style/responsive";

function Time() {
  const QATAR_TIME_DIFF = 3;
  const KOREA_TIME_DIFF = 9;

  const getQatarDateTime = () => getLocalDateTime(QATAR_TIME_DIFF);
  const getKoreaDateTime = () => getLocalDateTime(KOREA_TIME_DIFF);

  const [qatarDateTime, setQatarDateTime] = useState(getQatarDateTime);
  const [koreaDateTime, setKoreaDateTime] = useState(getKoreaDateTime);

  useEffect(() => {
    const clock = setInterval(() => {
      setQatarDateTime(getQatarDateTime);
      setKoreaDateTime(getKoreaDateTime);
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  return (
    <Wrapper>
      <Title>카타르 시간</Title>

      <TimeContainer>
        <TimeItem koName="카타르" enName="qatar" dateTime={qatarDateTime} />
        <TimeItem koName="대한민국" enName="korea" dateTime={koreaDateTime} />
      </TimeContainer>
    </Wrapper>
  );
}

export default Time;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 150px;
  padding: 40px 20px;
  ${mobile({ marginTop: "75px" })}
`;

const TimeContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
