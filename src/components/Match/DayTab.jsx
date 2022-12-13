import styled from "styled-components";
import { MATCH_DAYS } from "../../data/match-days";

function DayTab({ dayIndex, setDayIndex, scrollToDayMatch }) {
  return (
    <Wrapper>
      <ul>
        {MATCH_DAYS.map((matchDay) => {
          const { id, month, day, days } = matchDay;
          return (
            <li
              key={id}
              className={id === dayIndex ? "active" : null}
              onClick={() => scrollToDayMatch(id)}
            >
              <div className="order">{id}일차</div>
              <div className="date">
                {month}/{day}({days})
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
  ul {
    display: flex;
    padding: 10px;
    overflow-x: scroll;
    .active {
      box-shadow: none;
      background-color: ${({ theme }) => theme.color.primary};
      color: white;
    }
    li {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      padding: 20px 15px;
      border-radius: 20px;
      box-shadow: ${({ theme }) => theme.shadow.boxShadow};
      color: ${({ theme }) => theme.color.gray};
      white-space: nowrap;
      text-align: center;
      font-family: "Pretendard-Regular";
      cursor: pointer;
      .order {
        font-size: 16px;
        font-weight: bold;
      }
      .date {
        font-size: 12px;
        line-height: 1.5;
      }
    }
  }
`;
