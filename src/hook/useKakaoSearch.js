import { useState, useEffect } from "react";
import axios from "axios";

function useKakaoSearch(section, query, sort, page, size) {
  // section 예시: 동영상(vclip), 이미지(image)
  const BASE_URL = `https://dapi.kakao.com/v2/search/${section}`;
  const API_KEY = process.env.REACT_APP_KAKAO_KEY;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMorePage, setHasMorePage] = useState(false);

  // 검색어가 바뀌면 데이터 초기화
  // 단, 검색어가 빈 문자열인 경우 제외
  useEffect(() => {
    if (query === "") return;
    setData([]);
  }, [query]);

  // 정렬 조건이 바뀌면 데이터 초기화
  useEffect(() => {
    setData([]);
  }, [sort]);

  // 검색어, 정렬 조건, (무한 스크롤 요청으로) 페이지가 바뀌면 api 호출 실행
  // 단, 검색어가 빈 문자열인 경우 제외
  useEffect(() => {
    if (query === "") return;

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
        size: size,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((prev) => [...prev, ...res.data.documents]);
        setHasMorePage(!res.data.meta.is_end);
        setIsLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setIsLoading(false);
        setError(true);
      });

    return () => cancel();
  }, [query, sort, page]);

  return { data, isLoading, error, hasMorePage };
}

export default useKakaoSearch;
