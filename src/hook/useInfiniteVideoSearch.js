import { useState, useEffect } from "react";
import axios from "axios";

function useInfiniteVideoSearch(query, sort, page) {
  const URL = "https://dapi.kakao.com/v2/search/vclip";
  const API_KEY = "e2c4d5c53f4e3ca42459fd92d91ac39a";

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMorePage, setHasMorePage] = useState(false);
  const [videosCount, setVideosCount] = useState(null);

  useEffect(() => {
    setVideos([]);
  }, [query, sort]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    let cancel;

    axios({
      method: "GET",
      url: URL,
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
      params: {
        query: query,
        sort: sort,
        page: page,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setVideos((prev) => [...prev, ...res.data.documents]);
        setHasMorePage(!res.data.meta.is_end);
        setVideosCount(res.data.meta.pageable_count);
        setIsLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query, sort, page]);

  return { videos, isLoading, error, hasMorePage, videosCount };
}

export default useInfiniteVideoSearch;
