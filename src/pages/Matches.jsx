import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MATCH_DAYS } from "../data/match-days";
import DayTab from "../components/Match/DayTab";
import DayMatch from "../components/Match/DayMatch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Common/Loader";
import { mobile } from "./../style/responsive";

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

        const matchesResponse = await fetch("/api/v1/match", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const matchesResults = await matchesResponse.json();
        const matchesData = matchesResults.data;

        setData(matchesData);
      } catch (err) {
        setError(err.message || "Server Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenAndData();
  }, []);

  const observer = useRef([]);
  useEffect(() => {
    const dayRefArray = MATCH_DAYS.map((day) => dayRef.current[day.id]);
    console.log(dayRefArray);

    if (isLoading) return;

    dayRefArray.forEach((dayRef, index) => {
      if (observer.current[index + 1]) {
        observer.current[index + 1].disconnect();
      }
    });

    dayRefArray.forEach((dayRef, index) => {
      observer.current[index + 1] = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            console.log(index + 1, "교차했음", entries[0].target.id);
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
      console.log("observer등록", dayRef);
    });

    return () => {
      dayRefArray.forEach((dayRef, index) => {
        observer.current[index + 1].disconnect();
      });
    };
  }, [isLoading]);

  if (isLoading) return <Loader msg="경기 정보를 불러오는 중입니다." />;

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
