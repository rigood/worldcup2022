import { useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import theme from "./style/theme";
import GlobalStyles from "./style/GlobalStyle";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import News from "./pages/News";
import Clips from "./pages/Clips";
import Photos from "./pages/Photos";
import MY from "./pages/MY";
import Footer from "./components/Common/Footer";

function App() {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <Main>
          {tabIndex === 1 && <Home />}
          {tabIndex === 2 && <Matches />}
          {tabIndex === 3 && <Players />}
          {tabIndex === 4 && <News />}
          {tabIndex === 5 && <Clips />}
          {tabIndex === 6 && <Photos />}
          {tabIndex === 7 && <MY />}
        </Main>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

const Main = styled.main`
  margin-top: 120px;
`;
