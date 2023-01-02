import styled from "styled-components";

function getGroup(group) {
  switch (group) {
    case "FIN":
      return "결승";
    case "3RD":
      return "3·4위";
    case "semi":
      return "준결승";
    case "QR":
      return "8강";
    case "R16":
      return "16강";
    default:
      return `${group}조`;
  }
}

function DayMatchItem({ match }) {
  const homeScorers = match.home_scorers[0]
    ?.split(",")
    ?.filter((player) => player !== "null");
  const awayScorers = match.away_scorers[0]
    ?.split(",")
    ?.filter((player) => player !== "null");

  const isNoGoalMatch = (match.home_score === 0) & (match.away_score === 0);

  return (
    <Wrapper>
      <TopRow>
        <div className="team-box home">
          <img src={match.home_flag} alt="flag" />
          <div className="country">{match.home_team_en}</div>
        </div>

        <div className="score-box">
          <div className="group-info">{getGroup(match.group)}</div>
          <div>
            <span
              className="score-num"
              id={match.home_score > match.away_score ? "winner" : null}
            >
              {match.home_score}
            </span>
            <span className="colon">:</span>
            <span
              className="score-num"
              id={match.away_score > match.home_score ? "winner" : null}
            >
              {match.away_score}
            </span>
          </div>
        </div>

        <div className="team-box away">
          <img src={match.away_flag} alt="flag" />
          <div className="country">{match.away_team_en}</div>
        </div>
      </TopRow>

      {isNoGoalMatch ? null : (
        <BottomRow>
          <ul className="scorers home">
            {homeScorers?.map((player, index) => {
              return <li key={index}>{player}</li>;
            })}
          </ul>

          <ul className="scorers away">
            {awayScorers?.map((player, index) => {
              return <li key={index}>{player}</li>;
            })}
          </ul>
        </BottomRow>
      )}
    </Wrapper>
  );
}

export default DayMatchItem;

const Wrapper = styled.div`
  width: 100%;
  margin: 20px 0 80px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0;
  .team-box {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      margin-bottom: 10px;
      box-shadow: ${({ theme }) => theme.shadow.boxShadow};
    }
    .country {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
  }
  .score-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: 5px;
    .group-info {
      font-size: 16px;
      font-weight: bold;
      line-height: 2;
    }
    .score-num,
    .colon {
      font-size: 28px;
      font-weight: bold;
      color: #a5a5a5;
      font-family: "digital";
    }
    .colon {
      margin: 0 5px;
    }
    #winner {
      color: ${({ theme }) => theme.color.primary};
      font-size: 32px;
    }
  }
`;

const BottomRow = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.color.lightprimary};

  .scorers {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    line-height: 2;
  }
  .home {
    text-align: end;
    border-right: 1px solid lightgray;
  }
  .away {
    text-align: start;
  }
`;
