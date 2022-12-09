import { useRef } from "react";

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
    <form>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={handleInput}
        ref={inputRef}
        autoFocus
      />
      {query !== "" && (
        <button type="button" onClick={handleReset}>
          ❌
        </button>
      )}
    </form>
  );
}

export default SearchForm;
