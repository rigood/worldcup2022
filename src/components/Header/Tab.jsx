import { useRef } from "react";
import styled from "styled-components";
import useSlider from "../../hook/useSlider";
import { TAB_ITEMS } from "../../data/tab-items";
import { checkLocalhost } from "../../utils/checkLocalhost";

function Tab({ tabIndex, setTabIndex }) {
  const tabContainerRef = useRef(null);
  useSlider(tabContainerRef);

  const isLocalhost = checkLocalhost();

  const handleTabClick = (index) => setTabIndex(index);

  return (
    <TabContainer ref={tabContainerRef}>
      {TAB_ITEMS.map((tab, index) => {
        return (
          <TabItem
            key={index}
            hide={tab === "News" && !isLocalhost ? true : false}
            className={tabIndex === index && "active"}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </TabItem>
        );
      })}
    </TabContainer>
  );
}

export default Tab;

const TabItem = styled.li`
  &:not(:last-child) {
    margin-right: 25px;
  }
  padding-bottom: 10px;
  border-bottom: 5px solid transparent;
  font-size: 16px;
  font-family: "GmarketSansMedium";
  color: ${({ theme }) => theme.color.lightwhite};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  user-select: none;
  display: ${({ hide }) => (hide ? "none" : "flex")};

  &.active {
    border-color: white;
    color: white;
  }

  @media (hover: hover) {
    &:hover:not(.active) {
      color: white;
    }
  }
`;

const TabContainer = styled.ul`
  display: flex;
  padding: 10px 20px 0 20px;
  background-color: ${({ theme }) => theme.color.primary};
  overflow-x: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  &.dragging {
    scroll-behavior: auto;
  }

  &.dragging ${TabItem} {
    pointer-events: none;
  }
`;
