import { useState, useRef, useCallback } from "react";
import useDebounce from "../hook/useDebounce";
import useKakaoSearch from "../hook/useKakaoSearch";
import useInfiniteScroll from "../hook/useInfiniteScroll";
import RadioButtons from "../components/RadioButtons";
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
  } = useKakaoSearch("image", debouncedQuery, sort, page);

  const lastPhotoRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

  const handleQueryInput = (e) => {
    setQuery(e.target.value);
    setPage(1);
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

      <RadioButtons setSort={setSort} />

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
      <div ref={lastPhotoRef} />
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
