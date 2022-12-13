import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MATCH_DAYS } from "../data/match-days";
import DayTab from "../components/Match/DayTab";
import DayMatch from "../components/Match/DayMatch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Common/Loader";

const EMAIL = process.env.REACT_APP_WORLDCUP_EMAIL;
const PASSWORD = process.env.REACT_APP_WORLDCUP_PASSWORD;

const loginInfo = `{
    "email": "${EMAIL}",
    "password": "${PASSWORD}"
    }`;

function Matches() {
  const [dayIndex, setDayIndex] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dayRef = useRef([]);

  const scrollToDayMatch = (day) => {
    setDayIndex(day);
    const offset = dayRef?.current[day]?.getBoundingClientRect().top - 140;
    window.scrollTo({ top: offset });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchTokenAndData = async () => {
      try {
        const response = await fetch("/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: loginInfo,
        });

        if (!response.ok) {
          throw new Error(`${response.status} Error`);
        }

        const results = await response.json();
        const token = await results.data.token;
        console.log(token);

        const matchesResponse = await fetch("/api/v1/match", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const matchesResults = await matchesResponse.json();
        const matchesData = matchesResults.data;
        console.log(matchesData);

        setData(matchesData);
      } catch (err) {
        setError(err.message || "Server Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenAndData();
  }, []);

  if (isLoading) return <Loader msg="경기 정보를 불러오는 중입니다." />;

  return (
    <>
      <DayTab
        dayIndex={dayIndex}
        setDayIndex={setDayIndex}
        scrollToDayMatch={scrollToDayMatch}
      />
      <InfoMsg>
        <FontAwesomeIcon icon={faCircleInfo} />
        <h2>카타르 현지 시간 기준으로 작성되었습니다.</h2>
      </InfoMsg>

      {MATCH_DAYS.map((day) => {
        return (
          <DayMatch
            key={day.id}
            day={day}
            dataByDay={data?.filter(
              (match) => match.matchday === String(day.id)
            )}
            ref={(el) => (dayRef.current[day.id] = el)}
          />
        );
      })}
    </>
  );
}

export default Matches;

const InfoMsg = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: gray;
  svg {
    width: 12px;
    margin-right: 5px;
  }
  h2 {
    font-size: 12px;
    font-family: "Pretendard-Regular";
    line-height: 1.5;
  }
`;
