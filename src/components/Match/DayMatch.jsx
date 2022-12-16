import { forwardRef } from "react";
import styled from "styled-components";
import DayMatchItem from "./DayMatchItem";

function DayMatch({ day, dataByDay }, ref) {
  return (
    <Wrapper>
      <Title ref={ref}>
        <span className="date">
          {day.month}/{day.day}({day.days})
        </span>
        <span className="order">{day.id}일차</span>
      </Title>
      <Main>
        {dataByDay.length === 0 ? (
          <NoMatchItem>경기가 없습니다.</NoMatchItem>
        ) : null}
        {dataByDay.map((match) => {
          return <DayMatchItem key={match.id} match={match} />;
        })}
      </Main>
    </Wrapper>
  );
}

export default forwardRef(DayMatch);

const Wrapper = styled.div``;

const Title = styled.div`
  font-family: "Pretendard";

  .date {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.primary};
    margin-right: 5px;
  }
  .order {
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
  }
`;

const NoMatchItem = styled.div`
  width: 100%;
  margin: 20px 0 80px;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  font-family: "Pretendard";
  font-size: 16px;
`;

const Main = styled.div``;
