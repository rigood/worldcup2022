import { useState, useEffect } from "react";
import axios from "axios";

function useKakaoInfiniteSearch(section, query, sort, page) {
  // section 예시: 동영상(vclip), 이미지(image)
  const BASE_URL = `https://dapi.kakao.com/v2/search/${section}`;
  const API_KEY = "e2c4d5c53f4e3ca42459fd92d91ac39a";
  const NUM_OF_DATA_PER_PAGE = 15;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMorePage, setHasMorePage] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

  // 검색어, 정렬 조건이 바뀌면 데이터 초기화
  useEffect(() => {
    setData([]);
  }, [query, sort]);

  // 검색어, 정렬 조건, (무한 스크롤 요청으로) 페이지가 바뀌면 api 호출 실행
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    let cancel;

    axios({
      method: "GET",
      url: BASE_URL,
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
      params: {
        query: query,
        sort: sort,
        page: page,
        size: NUM_OF_DATA_PER_PAGE,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((prev) => [...prev, ...res.data.documents]);
        setHasMorePage(!res.data.meta.is_end);
        setTotalCount(res.data.meta.pageable_count);
        setIsLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query, sort, page]);

  return { data, isLoading, error, hasMorePage, totalCount };
}

export default useKakaoInfiniteSearch;
