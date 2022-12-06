import { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Tab from "./components/Tab";
import Home from "./pages/Home";
import News from "./pages/News";
import Players from "./pages/Players";

function Main() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <MainLayout>
      <MainContainer>
        <Header />
        <Tab tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <TabContentsWrapper>
          {tabIndex === 0 && <Home />}
          {tabIndex === 1 && <News />}
          {tabIndex === 2 && <Players />}
        </TabContentsWrapper>
      </MainContainer>
    </MainLayout>
  );
}

export default Main;

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
