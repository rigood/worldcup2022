import { forwardRef } from "react";
import { formatDate } from "../utils/format";

function PhotoItem({ image }) {
  const {
    collection,
    thumbnail_url,
    image_url,
    width,
    height,
    display_sitename,
    doc_url,
    datetime,
  } = image;
  return (
    <li>
      <img src={thumbnail_url} />
      <div>{formatDate(datetime)}</div>
    </li>
  );
}

export default PhotoItem;
