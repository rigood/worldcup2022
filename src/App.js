import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./style/GlobalStyle";
import Header from "./components/Main/Header";
import Tab from "./components/Main/Tab";
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
      <GlobalStyles />
      <MainLayout>
        <MainContainer>
          <Header />
          <Tab tabIndex={tabIndex} setTabIndex={setTabIndex} />
          <TabContentsWrapper>
            {tabIndex === 0 && <Home />}
            {/* {tabIndex === 1 && <Matches />} */}
            {tabIndex === 2 && <Players />}
            {tabIndex === 3 && <Clips />}
            {tabIndex === 4 && <Photos />}
            {tabIndex === 5 && <MY />}
            {/* {tabIndex === 6 && <Store />} */}
            {tabIndex === 7 && <News />}
          </TabContentsWrapper>
        </MainContainer>
      </MainLayout>
    </>
  );
}

export default App;

const MainLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 100%;
  max-width: 450px;
  min-height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const TabContentsWrapper = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
