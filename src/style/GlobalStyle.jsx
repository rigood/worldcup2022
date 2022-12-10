import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}

@font-face {
  font-family: "GmarketSansMedium";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-style: normal;
}

*{
    box-sizing: border-box;
}

body{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard-Regular';
  line-height: 1.3;
  &::-webkit-scrollbar{
    display: none
  }
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
