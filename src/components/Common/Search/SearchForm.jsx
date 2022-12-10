import styled from "styled-components";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

function SearchForm({ query, setQuery, setPage }) {
  const inputRef = useRef();

  const handleInput = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleReset = () => {
    setQuery("");
    inputRef.current.focus();
  };

  return (
    <Form>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={query}
        onChange={handleInput}
        ref={inputRef}
        autoFocus
      />
      <SearchIcon icon={faMagnifyingGlass} />
      {query !== "" && <ResetButton onClick={handleReset} icon={faXmark} />}
    </Form>
  );
}

export default SearchForm;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  position: relative;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    &,
    &::placeholder {
      font-size: 14px;
    }
  }

  button {
    width: 30px;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: 15px;
  color: ${({ theme }) => theme.color.gray};
`;

const ResetButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.gray};
`;
