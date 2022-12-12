import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLocalDateTime } from "../../utils/getLocalDateTime";
import TitleContainer from "../Common/TitleContainer";
import TimeItem from "./TimeItem";
import { faClock } from "@fortawesome/free-solid-svg-icons";

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
    <>
      <TitleContainer>
        <FontAwesomeIcon icon={faClock} />
        <h2>What time is it?</h2>
      </TitleContainer>
      <TimeContainer>
        <TimeItem koName="카타르" enName="qatar" dateTime={qatarDateTime} />
        <TimeItem koName="대한민국" enName="korea" dateTime={koreaDateTime} />
      </TimeContainer>
    </>
  );
}

export default Time;

const TimeContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  display: flex;
`;
