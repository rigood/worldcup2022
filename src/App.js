import { useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import theme from "./style/theme";
import GlobalStyles from "./style/GlobalStyle";
import Header1 from "./components/Header/Header1";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import News from "./pages/News";
import Clips from "./pages/Clips";
import Photos from "./pages/Photos";
import MY from "./pages/MY";
import Footer from "./components/Common/Footer";
import { desktop } from "./style/responsive";

function App() {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header1 tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <Wrapper>
          <Main>
            {tabIndex === 1 && <Home />}
            {tabIndex === 2 && <Matches />}
            {tabIndex === 3 && <Players />}
            {tabIndex === 4 && <News />}
            {tabIndex === 5 && <Clips />}
            {tabIndex === 6 && <Photos />}
            {tabIndex === 7 && <MY />}
          </Main>
        </Wrapper>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Main = styled.main`
  margin-top: 80px;
  ${desktop({ marginTop: "140px" })}
`;
