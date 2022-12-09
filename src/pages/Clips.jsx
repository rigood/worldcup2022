import { useState, useRef } from "react";
import useDebounce from "../hook/useDebounce";
import useKakaoSearch from "../hook/useKakaoSearch";
import useInfiniteScroll from "../hook/useInfiniteScroll";
import RadioButtons from "../components/RadioButtons";
import ClipItem from "../components/ClipItem";
import ClipSkeleton from "../components/ClipSkeleton";

function Clips() {
  const [query, setQuery] = useState("월드컵");
  const [sort, setSort] = useState("accuracy");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 500);

  const {
    data: videos,
    isLoading,
    error,
    hasMorePage,
    totalCount,
  } = useKakaoSearch("vclip", debouncedQuery, sort, page);

  const lastClipRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

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
        {videos?.map((video, index) => {
          if (videos.length === index + 1) {
            return <ClipItem ref={lastClipRef} key={index} video={video} />;
          } else {
            return <ClipItem key={index} video={video} />;
          }
        })}
      </ul>
      {query === "" ? (
        <div>추천 검색어: 월드컵, 손흥민, 조규성</div>
      ) : isLoading ? (
        <ClipSkeleton count={15} />
      ) : error ? (
        <div>Error</div>
      ) : null}
    </>
  );
}

export default Clips;
