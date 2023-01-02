import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MATCH_DAYS } from "../data/match-days";
import DayTab from "../components/Match/DayTab";
import DayMatch from "../components/Match/DayMatch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Common/Loader";
import { mobile } from "./../style/responsive";
import ErrorElement from "../components/Common/ErrorElement";

// API 로그인
const EMAIL = process.env.REACT_APP_WORLDCUP_EMAIL;
const PASSWORD = process.env.REACT_APP_WORLDCUP_PASSWORD;

const loginInfo = `{
    "email": "${EMAIL}",
    "password": "${PASSWORD}"
    }`;

function Matches() {
  // Match Day 탭 관련
  const [dayIndex, setDayIndex] = useState(1);
  const dayRef = useRef([]);

  const handleDayTabClick = (index) => {
    if (dayRef && dayRef.current) {
      const offset =
        dayRef.current[index].getBoundingClientRect().top +
        window.pageYOffset -
        300;
      window.scrollTo({ top: offset });
      setDayIndex(index);
    }
  };

  // fetch 관련 state 선언
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Match 정보 API 호출
  useEffect(() => {
    setIsLoading(true);

    const fetchTokenAndData = async () => {
      try {
        const response = await fetch(
          "http://api.cup2022.ir/api/v1/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: loginInfo,
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status ? `${response.status} 에러 발생` : "에러 발생"
          );
        }

        const results = await response.json();
        const token = await results.data.token;

        const matchesResponse = await fetch(
          "http://api.cup2022.ir/api/v1/user/login/api/v1/match",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const matchesResults = await matchesResponse.json();
        const matchesData = matchesResults.data;

        setData(matchesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenAndData();
  }, []);

  // Intersection Observer API를 이용하여 스크롤에 따라 Match Day 탭 활성화
  const observer = useRef([]);

  useEffect(() => {
    if (isLoading) return;
    if (error) return;

    const dayRefArray = MATCH_DAYS.map((day) => dayRef.current[day.id]);

    dayRefArray.forEach((dayRef, index) => {
      if (observer.current[index + 1]) {
        observer.current[index + 1].disconnect();
      }
    });

    dayRefArray.forEach((dayRef, index) => {
      observer.current[index + 1] = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const id = parseInt(entries[0].target.id);
            setDayIndex(id);
          }
        },

        {
          rootMargin: document.getElementById("main"),
          rootMargin: "-120px 0px 0px 0px",
          threshold: 0.5,
        }
      );
    });

    dayRefArray.forEach((dayRef, index) => {
      observer.current[index + 1].observe(dayRef);
    });

    return () => {
      dayRefArray.forEach((dayRef, index) => {
        observer.current[index + 1].disconnect();
      });
    };
  }, [isLoading, error]);

  // 로딩, 에러 상태 표시
  if (isLoading) return <Loader msg="경기 정보를 불러오는 중입니다." />;
  if (error) return <ErrorElement msg={error} />;

  return (
    <>
      <Fixed>
        <DayTab dayIndex={dayIndex} handleDayTabClick={handleDayTabClick} />

        <InfoMsg>
          <FontAwesomeIcon icon={faCircleInfo} />
          <p>카타르 현지 시간 기준으로 작성되었습니다.</p>
        </InfoMsg>
      </Fixed>

      <Wrapper>
        {MATCH_DAYS.map((day) => {
          return (
            <DayMatch
              key={day.id}
              id={day.id}
              day={day}
              dataByDay={data?.filter(
                (match) => match.matchday === String(day.id)
              )}
              ref={(el) => (dayRef.current[day.id] = el)}
            />
          );
        })}
      </Wrapper>
    </>
  );
}

export default Matches;

const Fixed = styled.div`
  position: fixed;
  top: 120px;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 30px 20px 15px;
  border-bottom: 1px solid lightgray;
  z-index: 9998;
`;

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  margin-top: 300px;
  padding: 40px 20px;
`;

const InfoMsg = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  color: gray;
  svg {
    width: 12px;
    margin-right: 5px;
    ${mobile({ width: "10px" })}
  }
  p {
    font-size: 14px;
    font-family: "Pretendard";
    line-height: 1.5;
    ${mobile({ fontSize: "12px" })}
  }
`;
