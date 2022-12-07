import { useEffect } from "react";
import useFetch from "../hook/useFetch";
import { formatDate, formatSeconds } from "../utils/format";

const BASE_URL = "https://dapi.kakao.com/v2/search/vclip";
const API_KEY = "e2c4d5c53f4e3ca42459fd92d91ac39a";

function Clips() {
  const url = `${BASE_URL}?query=월드컵`;
  const [{ data, isLoading, error }, doFetch] = useFetch(url);

  useEffect(() => {
    doFetch({
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    });
  }, [doFetch]);

  const videos = data?.documents;

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <p>
        에러가 발생하였습니다. <br /> ({error})
      </p>
    );
  }

  return (
    <ul>
      {videos?.map((video, index) => {
        const { author, datetime, play_time, thumbnail, title, url } = video;
        return (
          <li key={index}>
            <img src={thumbnail} style={{ width: "100px", height: "66px" }} />
            <div>
              <a href={url} target="_blank">
                {title}
              </a>
            </div>
            <div>{formatSeconds(play_time)}</div>
            <div>{author}</div>
            <div>{formatDate(datetime)}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default Clips;
