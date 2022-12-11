import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDebounce from "../hook/useDebounce";
import useKakaoSearch from "../hook/useKakaoSearch";
import useInfiniteScroll from "../hook/useInfiniteScroll";
import TitleContainer from "../components/Common/TitleContainer";
import SearchForm from "./../components/Common/Search/SearchForm";
import PopularSearch from "./../components/Common/Search/PopularSearch";
import SortRadioButtons from "./../components/Common/Search/SortRadioButtons";
import PhotoItem from "./../components/Photo/PhotoItem";
import PhotoSkeleton from "./../components/Photo/PhotoSkeleton";
import ErrorElement from "./../components/Common/ErrorElement";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function Photos() {
  const PAGE_SIZE = 14;
  const [query, setQuery] = useState("월드컵");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("accuracy");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, hasMorePage } = useKakaoSearch(
    "image",
    debouncedQuery,
    sort,
    page,
    PAGE_SIZE
  );

  const lastPhotoRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

  return (
    <>
      <TitleSortContainer>
        <TitleContainer>
          <FontAwesomeIcon icon={faImage} />
          <h2>이미지 검색</h2>
        </TitleContainer>
        <SortRadioButtons setSort={setSort} />
      </TitleSortContainer>

      <SearchForm query={query} setQuery={setQuery} setPage={setPage} />
      <PopularSearch setQuery={setQuery} setPage={setPage} />

      {data.length ? (
        <PhotoGrid>
          {data?.map((photo, index) => {
            if (data.length === index + 1) {
              return <PhotoItem ref={lastPhotoRef} key={index} photo={photo} />;
            } else {
              return <PhotoItem key={index} photo={photo} />;
            }
          })}
        </PhotoGrid>
      ) : null}

      {isLoading && (
        <PhotoGrid>
          <PhotoSkeleton count={PAGE_SIZE} />
        </PhotoGrid>
      )}

      {error && <ErrorElement />}
    </>
  );
}
export default Photos;

const TitleSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const PhotoGrid = styled.div`
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 20px;
`;
