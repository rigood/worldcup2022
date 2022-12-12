import styled from "styled-components";
import { getIconUrl } from "../../utils/getIconUrl";

function WeatherItem(props) {
  const { country, data } = props;

  return (
    <Wrapper>
      <div className="country">{country}</div>
      <img src={getIconUrl(data.weather[0].icon)} />
      <div className="temp">
        <div className="current">{data.main?.temp.toFixed(1)}°</div>
        <div className="minmax">
          <span className="min">{data.main?.temp_min.toFixed()}°</span>
          <span className="line">/</span>
          <span className="max">{data.main?.temp_max.toFixed()}°</span>
        </div>
      </div>
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
    font-family: "GmarketSansMedium";
  }
  .img {
    margin-bottom: 10px;
  }
  .temp {
    text-align: center;
    font-family: "Pretendard-Regular";
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