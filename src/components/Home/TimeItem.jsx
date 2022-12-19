import styled from "styled-components";

function TimeItem(props) {
  const { koName, enName, dateTime } = props;

  return (
    <Wrapper>
      <div className="country">
        <img src={process.env.PUBLIC_URL + `/assets/${enName}-flag.png`} />
        <span className="name">{koName}</span>
      </div>
      <div className="datetime">
        <div className="date">{dateTime.date}</div>
        <div className="time">{dateTime.time}</div>
      </div>
    </Wrapper>
  );
}

export default TimeItem;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  .country {
    margin-bottom: 10px;
    img {
      width: 24px;
      margin-right: 7.5px;
      position: relative;
      bottom: -5px;
    }
    .name {
      font-size: 18px;
      font-family: "Pretendard";
    }
  }

  .datetime {
    flex: 1;
    text-align: center;
    font-family: "Pretendard";

    .date {
      font-size: 14px;
      color: ${({ theme }) => theme.color.gray};
      margin-bottom: 2px;
    }
    .time {
      font-size: 24px;
      font-family: "digital";
      font-weight: bold;
      letter-spacing: 1px;
    }
  }
`;
