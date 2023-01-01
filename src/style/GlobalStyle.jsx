import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}

@font-face {
  font-family: "digital";
  font-style: "normal";
  src: url("../fonts/LAB_digital.ttf") format('truetype'), url("../fonts/LAB_digital.woff") format('woff');
}

*{
    box-sizing: border-box;
}

body{
  line-height: 1.3;
  /* &::-webkit-scrollbar{
    display: none
  } */
}

a{
  text-decoration: none;
  color: inherit;
}

button{
  background-color: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
}


input, input::placeholder{
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

select{
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

ul, li{
  list-style: none;
}

`;

export default GlobalStyles;
