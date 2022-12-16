import { useRef } from "react";
import styled from "styled-components";
import { MATCH_DAYS } from "../../data/match-days";
import useSlider from "../../hook/useSlider";

function DayTab({ dayIndex, setDayIndex }) {
  const sliderRef = useRef(null);
  useSlider(sliderRef);

  return (
    <Wrapper>
      <ul ref={sliderRef}>
        {MATCH_DAYS.map((matchDay) => {
          const { id, month, day, days } = matchDay;
          return (
            <li
              key={id}
              className={id === dayIndex ? "active" : null}
              onClick={() => setDayIndex(id)}
            >
              <div className="order">{id}일차</div>
              <div className="date">
                {day}({days})
              </div>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
}

export default DayTab;

const Wrapper = styled.nav`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  ul {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
    &.dragging {
      scroll-behavior: auto;
    }
    &.dragging li {
      pointer-events: none;
    }
    .active {
      background-color: ${({ theme }) => theme.color.primary};
      color: white;
    }
    li {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      padding: 20px 30px;
      border-radius: 20px;
      background-color: ${({ theme }) => theme.color.lightprimary};
      white-space: nowrap;
      text-align: center;
      font-family: "Pretendard";
      cursor: pointer;
      user-select: none;
      .order {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .date {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
`;
