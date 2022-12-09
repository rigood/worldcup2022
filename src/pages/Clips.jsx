import { useState } from "react";
import useDebounce from "../hook/useDebounce";
import useKakaoSearch from "../hook/useKakaoSearch";
import useInfiniteScroll from "../hook/useInfiniteScroll";
import SearchForm from "./../components/Common/Search/SearchForm";
import PopularSearch from "./../components/Common/Search/PopularSearch";
import RadioButtons from "./../components/Common/Search/RadioButtons";
import ClipItem from "./../components/Clip/ClipItem";
import ClipSkeleton from "./../components/Clip/ClipSkeleton";
import ErrorElement from "./../components/Common/ErrorElement";

function Clips() {
  const [query, setQuery] = useState("월드컵");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("accuracy");
  const [page, setPage] = useState(1);

  const {
    data: videos,
    isLoading,
    error,
    hasMorePage,
  } = useKakaoSearch("vclip", debouncedQuery, sort, page);

  const lastClipRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

  return (
    <>
      <SearchForm query={query} setQuery={setQuery} setPage={setPage} />
      <PopularSearch setQuery={setQuery} setPage={setPage} />
      <RadioButtons setSort={setSort} />

      <ul>
        {videos?.map((video, index) => {
          if (videos.length === index + 1) {
            return <ClipItem ref={lastClipRef} key={index} video={video} />;
          } else {
            return <ClipItem key={index} video={video} />;
          }
        })}
      </ul>

      {isLoading && <ClipSkeleton count={15} />}
      {error && <ErrorElement />}
    </>
  );
}

export default Clips;
