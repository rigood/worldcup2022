import { forwardRef } from "react";
import { formatDate, formatSeconds } from "../utils/format";

function ClipItem({ video }, ref) {
  const { author, datetime, play_time, thumbnail, title, url } = video;
  return (
    <li>
      <img src={thumbnail} style={{ width: "100px", height: "66px" }} />
      <div>
        <a href={url} target="_blank">
          {title}
        </a>
      </div>
      <div>{formatSeconds(play_time)}</div>
      <div>{author}</div>
      <div ref={ref}>{formatDate(datetime)}</div>
    </li>
  );
}

export default forwardRef(ClipItem);
