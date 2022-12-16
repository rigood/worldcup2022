import styled from "styled-components";
import { mobile } from "../../style/responsive";
import Title from "../Common/Title";
import MapChart from "./MapChart";

function Map() {
  return (
    <Wrapper>
      <Title>카타르 위치</Title>

      <MapChartContainer>
        <MapChart />
      </MapChartContainer>
    </Wrapper>
  );
}

export default Map;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 80px;
  padding: 40px 20px;
  ${mobile({ marginBottom: "40px" })}
`;

const MapChartContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  font-size: 0;
`;
