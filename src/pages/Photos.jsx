import { useState } from "react";
import useDebounce from "../hook/useDebounce";
import useKakaoSearch from "../hook/useKakaoSearch";
import useInfiniteScroll from "../hook/useInfiniteScroll";
import SearchForm from "../components/SearchForm";
import RadioButtons from "../components/RadioButtons";
import PhotoItem from "../components/PhotoItem";
import PhotoSkeleton from "../components/PhotoSkeleton";

function Photos() {
  const [query, setQuery] = useState("월드컵");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("accuracy");
  const [page, setPage] = useState(1);

  const {
    data: images,
    isLoading,
    error,
    hasMorePage,
    totalCount,
  } = useKakaoSearch("image", debouncedQuery, sort, page);

  const lastPhotoRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

  return (
    <>
      <SearchForm query={query} setQuery={setQuery} setPage={setPage} />
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
