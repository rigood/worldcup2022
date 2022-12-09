import { useRef } from "react";
import styled from "styled-components";
import useDragSlider from "../../hook/useDragSlider";
import { TAB_ITEMS } from "../../data/tab-items";
import color from "../../style/color";

function Tab({ tabIndex, setTabIndex }) {
  const tabContainerRef = useRef(null);
  const isDragging = useDragSlider(tabContainerRef);

  const handleTabClick = (index) => setTabIndex(index);

  return (
    <TabContainer ref={tabContainerRef}>
      {TAB_ITEMS.map((tab, index) => {
        return (
          <TabItem
            key={index}
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
  margin: 10px 10px 0 10px;
  padding-bottom: 10px;
  border-bottom: 5px solid transparent;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease-in-out;

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
  column-gap: 20px;
  padding: 10px 10px 0 10px;
  background-color: ${color.primary};
  color: white;
  font-size: 16px;
  overflow-x: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  &.dragging {
    scroll-behavior: auto;
    cursor: grab;
  }

  &.dragging ${TabItem} {
    pointer-events: none;
  }
`;
