import styled from "styled-components";
import { getIconUrl } from "../../utils/getIconUrl";

function WeatherItem(props) {
  const { koName, enName, data } = props;

  return (
    <Wrapper>
      <div className="country">
        <img src={`/assets/${enName}-flag.png`} />
        <span className="name">{koName}</span>
      </div>

      <img src={getIconUrl(data?.weather?.[0]?.icon)} />

      {data?.main?.temp ? (
        <div className="temp">
          <div className="current">{data?.main?.temp?.toFixed(1)}°</div>
          <div className="minmax">
            <span className="min">{data?.main?.temp_min?.toFixed()}°</span>
            <span className="line">/</span>
            <span className="max">{data?.main?.temp_max?.toFixed()}°</span>
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
}

export default WeatherItem;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 10%;

  .country {
    font-size: 18px;
    font-family: "Pretendard";
    img {
      width: 24px;
      margin-right: 7.5px;
      position: relative;
      bottom: -5px;
    }
  }

  .img {
    margin-bottom: 10px;
  }
  .temp {
    text-align: center;
    font-family: "Pretendard";
    .current {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .minmax {
      .min {
        color: DeepSkyBlue;
      }
      .max {
        color: Red;
      }
      .line {
        color: ${({ theme }) => theme.color.lightgray};
        margin: 0 2px;
      }
    }
  }
`;
