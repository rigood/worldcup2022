import styled from "styled-components";

function PopularSearch({ setQuery, setPage }) {
  const term_list = ["카타르", "손흥민", "조규성", "황희찬"];

  const handleTermClick = (e) => {
    setQuery(e.target.innerText);
    setPage(1);
  };

  return (
    <Wrapper>
      <h3>인기 검색어</h3>
      <ul>
        {term_list.map((term) => (
          <li key={term} onClick={handleTermClick}>
            {term}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

export default PopularSearch;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-left: 5px;
  font-size: 13px;

  h3 {
    font-weight: bold;
    color: ${({ theme }) => theme.color.primary};
    padding: 2px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-right: 2px;
      padding: 2px 4px;
      border-radius: 5px;
      cursor: pointer;
      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
