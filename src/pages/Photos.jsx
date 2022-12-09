import { useState } from "react";
import useDebounce from "../hook/useDebounce";
import useKakaoSearch from "../hook/useKakaoSearch";
import useInfiniteScroll from "../hook/useInfiniteScroll";
import SearchForm from "./../components/Common/Search/SearchForm";
import FavoriteSearch from "./../components/Common/Search/FavoriteSearch";
import RadioButtons from "./../components/Common/Search/RadioButtons";
import PhotoItem from "./../components/Photo/PhotoItem";
import PhotoSkeleton from "./../components/Photo/PhotoSkeleton";
import ErrorElement from "./../components/Common/ErrorElement";

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
  } = useKakaoSearch("image", debouncedQuery, sort, page);

  const lastPhotoRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

  return (
    <>
      <SearchForm query={query} setQuery={setQuery} setPage={setPage} />
      <FavoriteSearch setQuery={setQuery} setPage={setPage} />
      <RadioButtons setSort={setSort} />

      <ul>
        {images?.map((image, index) => {
          if (images.length === index + 1) {
            return <PhotoItem ref={lastPhotoRef} key={index} image={image} />;
          } else {
            return <PhotoItem key={index} image={image} />;
          }
        })}
      </ul>

      {isLoading && <PhotoSkeleton count={15} />}
      {error && <ErrorElement />}
    </>
  );
}
export default Photos;
