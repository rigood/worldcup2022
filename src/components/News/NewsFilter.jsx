import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as FilterIcon } from "../../svg/filter.svg";
import { formatFilterName } from "../../utils/format";

function NewsFilter({ articles, filter, setFilter }) {
  const [modalOpen, setModalOpen] = useState(false);

  const filterList = [
    ...new Set(articles?.map((article) => article.title.split(" - ")[1])),
  ];

  const openModal = () => setModalOpen(true);
  const closeModal = (e) => setModalOpen(false);

  const handleFilter = (e) => setFilter(e.target.innerText);
  const handleFilterReset = (e) => setFilter("all");

  return (
    <>
      <Title onClick={openModal}>
        <FilterIcon />
        <span>{formatFilterName(filter)}</span>
      </Title>
      {modalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent>
            <ul>
              <li onClick={handleFilterReset}>언론사 전체</li>
              {filterList.map((filter, index) => {
                return (
                  <li key={index} onClick={handleFilter}>
                    {filter}
                  </li>
                );
              })}
            </ul>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default NewsFilter;

const Title = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    margin-left: 5px;
  }
`;

const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  width: 260px;
  height: 300px;
  margin: 200px auto 0;
  border-radius: 20px;
  background-color: white;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  ul {
    li {
      cursor: pointer;
      padding: 15px 20px;
      font-size: 14px;
      &:hover {
        background-color: ${({ theme }) => theme.color.lightprimary};
      }
    }
  }
`;
