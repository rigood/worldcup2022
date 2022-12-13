import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleContainer from "../Common/TitleContainer";
import MapChart from "./MapChart";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Map() {
  return (
    <Wrapper>
      <TitleContainer>
        <FontAwesomeIcon icon={faLocationDot} />
        <h2>지도 위에 마우스를 올려보세요.</h2>
      </TitleContainer>
      <MapChart />
    </Wrapper>
  );
}

export default Map;

const Wrapper = styled.div`
  margin-bottom: 20px;
`;
