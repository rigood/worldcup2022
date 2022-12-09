import styled from "styled-components";

function PopularSearch({ setQuery, setPage }) {
  const term_list = ["손흥민", "조규성", "황희찬", "월드컵 우승국"];

  const handleTermClick = (e) => {
    setQuery(e.target.innerText);
    setPage(1);
  };

  return (
    <Wrapper>
      <h2>추천 검색어</h2>
      <SearchList>
        {term_list.map((term) => (
          <li key={term} onClick={handleTermClick}>
            {term}
          </li>
        ))}
      </SearchList>
    </Wrapper>
  );
}

export default PopularSearch;

const Wrapper = styled.div`
  display: flex;
`;

const SearchList = styled.ul`
  display: flex;
  li {
    margin-left: 5px;
    cursor: pointer;
  }
`;
