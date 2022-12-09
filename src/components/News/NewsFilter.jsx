import styled from "styled-components";
import color from "../../style/color";
import { ReactComponent as FilterIcon } from "../../svg/filter.svg";

function NewsFilter({ articles, setFilter }) {
  const filterList = [
    ...new Set(articles?.map((article) => article.title.split(" - ")[1])),
  ];

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Wrapper>
      <FilterIcon />
      <FilterSelect onChange={handleFilter}>
        <option value="all">언론사 전체</option>
        {filterList.map((filter, index) => {
          return (
            <option key={index} value={filter}>
              {filter}
            </option>
          );
        })}
      </FilterSelect>
    </Wrapper>
  );
}

export default NewsFilter;

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterSelect = styled.select`
  margin-left: 2px;
  width: 100px;
  font-size: 15px;
  color: ${color.primary};

  option {
    color: black;
  }
`;
