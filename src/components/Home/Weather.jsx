import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleContainer from "../Common/TitleContainer";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hook/useFetch";
import WeatherItem from "./WeatherItem";

const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=kr";
const API_KEY = process.env.REACT_APP_WEATHER_KEY;

function Weather() {
  const url = `${BASE_URL}&appid=${API_KEY}&q=`;

  const {
    data: qatarData,
    isLoading: qatarLoading,
    error: qatarError,
  } = useFetch(url + "doha");

  const {
    data: koreaData,
    isLoading: koreaLoading,
    error: koreaError,
  } = useFetch(url + "seoul");

  const isLoading = qatarLoading || koreaLoading;
  const error = qatarError || koreaError;

  return (
    <>
      <TitleContainer>
        <FontAwesomeIcon icon={faCloudSun} />
        <h2>How's the weather?</h2>
      </TitleContainer>

      {!isLoading && !error ? (
        <WeatherContainer>
          <WeatherItem koName="카타르" enName="qatar" data={qatarData} />
          <WeatherItem koName="대한민국" enName="korea" data={koreaData} />
        </WeatherContainer>
      ) : null}
    </>
  );
}

export default Weather;

const WeatherContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  display: flex;
`;
