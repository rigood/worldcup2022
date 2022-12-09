import { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import color from "./../style/color";
import ProfileUpload from "./../components/MY/ProfileUpload";
import ProfileInfo from "./../components/MY/ProfileInfo";

// import { ReactComponent as Logo } from "../svg/trophy.svg";

function MY() {
  return (
    <Wrapper>
      <ProfileUpload />
      <ProfileInfo />
    </Wrapper>
  );
}

export default MY;

const Wrapper = styled.div``;
