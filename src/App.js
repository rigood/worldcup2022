import { useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import theme from "./style/theme";
import GlobalStyles from "./style/GlobalStyle";
import Title from "./components/Header/Title";
import Tab from "./components/Header/Tab";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Clips from "./pages/Clips";
import Photos from "./pages/Photos";
import MY from "./pages/MY";
import News from "./pages/News";

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Wrapper>
          <Header>
            <Title />
            <Tab tabIndex={tabIndex} setTabIndex={setTabIndex} />
          </Header>
          <Main>
            {tabIndex === 0 && <Home />}
            {/* {tabIndex === 1 && <Matches />} */}
            {tabIndex === 2 && <Players />}
            {tabIndex === 3 && <Clips />}
            {tabIndex === 4 && <Photos />}
            {tabIndex === 5 && <MY />}
            {/* {tabIndex === 6 && <Store />} */}
            {tabIndex === 7 && <News />}
          </Main>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  max-width: 450px;
  min-height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Header = styled.nav`
  position: sticky;
  top: 0;
`;

const Main = styled.main`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
