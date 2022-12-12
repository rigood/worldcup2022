import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLocalDateTime } from "../../utils/getLocalDateTime";
import TitleContainer from "../Common/TitleContainer";
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
        <TimeItem>
          <div className="country">
            <img src="/assets/qatar-flag.png" />
            <span>카타르</span>
          </div>
          <div className="datetime">
            <div>{qatarDateTime.date}</div>
            <strong>{qatarDateTime.time}</strong>
          </div>
        </TimeItem>
        <TimeItem>
          <div className="country">
            <img src="/assets/korea-flag.png" />
            <span>대한민국</span>
          </div>
          <div className="datetime">
            <div>{koreaDateTime.date}</div>
            <strong>{koreaDateTime.time}</strong>
          </div>
        </TimeItem>
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
  flex-direction: column;
`;

const TimeItem = styled.div`
  flex: 1;
  margin: 20px 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .country {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 32px;
      margin-right: 7.5px;
    }
    span {
      font-size: 24px;
      font-family: "GmarketSansMedium";
      position: relative;
      bottom: -2px;
    }
  }
  .datetime {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-family: "Pretendard-Regular";
    strong {
      color: ${({ theme }) => theme.color.primary};
      font-size: 18px;
    }
  }
`;
