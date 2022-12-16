import styled from "styled-components";
import useFetch from "../../hook/useFetch";
import { mobile } from "../../style/responsive";
import Title from "../Common/Title";
import WeatherItem from "./WeatherItem";

const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=kr";
const API_KEY = process.env.REACT_APP_WEATHER_KEY;

function Weather() {
  const url = `${BASE_URL}&appid=${API_KEY}&q=`;

  const { data: qatarData } = useFetch(url + "doha");
  const { data: koreaData } = useFetch(url + "seoul");

  return (
    <Wrapper>
      <Title>카타르 날씨</Title>

      <WeatherContainer>
        <WeatherItem koName="카타르" enName="qatar" data={qatarData} />
        <WeatherItem koName="대한민국" enName="korea" data={koreaData} />
      </WeatherContainer>
    </Wrapper>
  );
}

export default Weather;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const WeatherContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
