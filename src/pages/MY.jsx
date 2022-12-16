import { useState } from "react";
import styled from "styled-components";
import Profile from "../components/MY/Profile";
import Like from "../components/MY/Like";

function MY() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Wrapper>
      <Tab>
        <TabItem
          className={tabIndex === 0 && "active"}
          onClick={() => setTabIndex(0)}
        >
          프로필
        </TabItem>
        <TabItem
          className={tabIndex === 1 && "active"}
          onClick={() => setTabIndex(1)}
        >
          좋아요
        </TabItem>
      </Tab>
      <Main>
        {tabIndex === 0 && <Profile />}
        {tabIndex === 1 && <Like />}
      </Main>
    </Wrapper>
  );
}

export default MY;

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const TabItem = styled.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-family: "Pretendard";
  color: ${({ theme }) => theme.color.gray};
  line-height: 2;
  cursor: pointer;
  &.active {
    border-bottom: 3px solid ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primary};
  }
`;

const Main = styled.div`
  padding: 40px 10px;
`;
