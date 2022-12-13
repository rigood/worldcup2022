import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Profile from "../components/MY/Profile";
import Like from "../components/MY/Like";

function MY() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
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
    </>
  );
}

export default MY;

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const TabItem = styled.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-family: "GmarketSansMedium";
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
