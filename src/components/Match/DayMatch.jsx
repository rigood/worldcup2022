import { forwardRef } from "react";
import styled from "styled-components";
import DayMatchItem from "./DayMatchItem";

function DayMatch({ day, dataByDay }, ref) {
  return (
    <Wrapper ref={ref}>
      <Title>
        <span className="order">{day.id}일차</span>
        <span className="date">
          {day.month}/{day.day}({day.days})
        </span>
      </Title>
      <Main>
        {dataByDay.map((match) => {
          return <DayMatchItem key={match.id} match={match} />;
        })}
      </Main>
    </Wrapper>
  );
}

export default forwardRef(DayMatch);

const Wrapper = styled.div`
  margin: 10px 0;
`;

const Title = styled.div`
  font-family: "Pretendard-Regular";

  .order {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.primary};
    margin-right: 5px;
    letter-spacing: 1px;
  }
  .date {
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray};
  }
`;

const Main = styled.div``;
