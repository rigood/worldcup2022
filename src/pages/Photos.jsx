import { useState, useRef, useCallback } from "react";
import useDebounce from "../hook/useDebounce";
import useKakaoInfiniteSearch from "../hook/useKakaoInfiniteSearch";

import PhotoItem from "../components/PhotoItem";
import PhotoSkeleton from "../components/PhotoSkeleton";

function Photos() {
  const [query, setQuery] = useState("월드컵");
  const [sort, setSort] = useState("accuracy");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 500);

  const {
    data: images,
    isLoading,
    error,
    hasMorePage,
    totalCount,
  } = useKakaoInfiniteSearch("image", debouncedQuery, sort, page);

  const observer = useRef();
  const lastImageRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMorePage) {
            setPage((prev) => prev + 1);
          }
        },
        {
          threshold: 1,
          rootMargin: "100px",
        }
      );

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

    setPage(1);
  };

  const handleSortSelect = (e) => {
    setSort(e.target.value);
  };

  const inputRef = useRef();
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
        totalCount ? (
          <div>총 검색 결과 {totalCount}개</div>
        ) : (
          <div>검색 결과가 존재하지 않습니다.</div>
        )
      ) : null}
      <ul>
        {images?.map((image, index) => {
          if (images.length === index + 1) {
            return <PhotoItem key={index} image={image} />;
          } else {
            return <PhotoItem key={index} image={image} />;
          }
        })}
      </ul>
      <div ref={lastImageRef} />
      {query === "" ? (
        <div>추천 검색어: 월드컵, 손흥민, 조규성</div>
      ) : isLoading ? (
        <PhotoSkeleton count={15} />
      ) : error ? (
        <div>Error</div>
      ) : null}
    </>
  );
}
export default Photos;
