import { useState, useRef, useCallback } from "react";
import ClipItem from "../components/ClipItem";
import useInfiniteVideoSearch from "../hook/useInfiniteVideoSearch";

function Clips() {
  const [query, setQuery] = useState("월드컵");
  const [sort, setSort] = useState("accuracy");
  const [pageNumber, setPageNumber] = useState(1);

  const { videos, isLoading, error, hasMorePage, count } =
    useInfiniteVideoSearch(query, sort, pageNumber);

  const inputRef = useRef();

  const observer = useRef();
  const lastVideoRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePage) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMorePage]
  );

  const handleQueryInput = (e) => {
    const keyword = e.target.value;
    setQuery(keyword);

    if (keyword === "") {
      setSort("accuracy");
    }

    setPageNumber(1);
  };

  const handleSortSelect = (e) => {
    setSort(e.target.value);
  };

  const handleResetButton = () => {
    setQuery("");
    inputRef.current.focus();
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={query}
          onChange={handleQueryInput}
          ref={inputRef}
          autoFocus
        />
        {query !== "" && (
          <button type="button" onClick={handleResetButton}>
            ❌
          </button>
        )}
      </form>
      {query !== "" ? (
        <select onChange={handleSortSelect}>
          <option value="accuracy">정확도</option>
          <option value="recency">최신순</option>
        </select>
      ) : null}
      {query !== "" ? (
        count ? (
          <div>총 검색 결과 {count}개</div>
        ) : (
          <div>검색 결과가 존재하지 않습니다.</div>
        )
      ) : null}
      <ul>
        {videos?.map((video, index) => {
          if (videos.length === index + 1) {
            return <ClipItem ref={lastVideoRef} key={index} video={video} />;
          } else {
            return <ClipItem key={index} video={video} />;
          }
        })}
      </ul>
      {query === "" ? (
        <div>추천 검색어: 월드컵, 손흥민, 조규성</div>
      ) : isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : null}
    </>
  );
}

export default Clips;
