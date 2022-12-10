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
import ClipItem from "./../components/Clip/ClipItem";
import ClipSkeleton from "./../components/Clip/ClipSkeleton";
import ErrorElement from "./../components/Common/ErrorElement";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

function Clips() {
  const PAGE_SIZE = 15;
  const [query, setQuery] = useState("월드컵");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("accuracy");
  const [page, setPage] = useState(1);

  const {
    data: videos,
    isLoading,
    error,
    hasMorePage,
  } = useKakaoSearch("vclip", debouncedQuery, sort, page, PAGE_SIZE);

  const lastClipRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

  return (
    <>
      <TitleSortContainer>
        <TitleContainer>
          <FontAwesomeIcon icon={faVideo} />
          <h2>동영상 검색</h2>
        </TitleContainer>
        <SortRadioButtons setSort={setSort} />
      </TitleSortContainer>

      <SearchForm query={query} setQuery={setQuery} setPage={setPage} />
      <PopularSearch setQuery={setQuery} setPage={setPage} />

      <ul>
        {videos?.map((video, index) => {
          if (videos.length === index + 1) {
            return <ClipItem ref={lastClipRef} key={index} video={video} />;
          } else {
            return <ClipItem key={index} video={video} />;
          }
        })}
      </ul>

      {isLoading && <ClipSkeleton count={PAGE_SIZE} />}
      {error && <ErrorElement />}
    </>
  );
}

export default Clips;

const TitleSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
