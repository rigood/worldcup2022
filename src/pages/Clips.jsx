import React, { useState } from "react";
import styled from "styled-components";
import useDebounce from "../hook/useDebounce";
import useKakaoSearch from "../hook/useKakaoSearch";
import useInfiniteScroll from "../hook/useInfiniteScroll";
import Title from "../components/Common/Title";
import SearchForm from "./../components/Common/Search/SearchForm";
import PopularSearch from "./../components/Common/Search/PopularSearch";
import SortRadioButtons from "./../components/Common/Search/SortRadioButtons";
import ClipItem from "./../components/Clip/ClipItem";
import ClipSkeleton from "./../components/Clip/ClipSkeleton";
import ErrorElement from "./../components/Common/ErrorElement";
import Line from "../components/Common/Line";

function Clips() {
  const PAGE_SIZE = 10;
  const [query, setQuery] = useState("월드컵");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = useState("accuracy");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, hasMorePage } = useKakaoSearch(
    "vclip",
    debouncedQuery,
    sort,
    page,
    PAGE_SIZE
  );

  const lastClipRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

  return (
    <Wrapper>
      <TitleSortContainer>
        <Title>동영상 검색</Title>
        <SortRadioButtons setSort={setSort} />
      </TitleSortContainer>

      <SearchForm query={query} setQuery={setQuery} setPage={setPage} />
      <PopularSearch setQuery={setQuery} setPage={setPage} />

      <ul>
        {data?.map((clip, index) => {
          if (index % PAGE_SIZE === PAGE_SIZE - 1) {
            return (
              <React.Fragment key={index}>
                <ClipItem clip={clip} />
                <Line />
              </React.Fragment>
            );
          } else {
            return <ClipItem key={index} clip={clip} />;
          }
        })}
      </ul>

      {!isLoading && !error ? <div ref={lastClipRef} /> : null}
      {isLoading && <ClipSkeleton count={PAGE_SIZE} />}
      {error && <ErrorElement />}
    </Wrapper>
  );
}

export default Clips;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const TitleSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
