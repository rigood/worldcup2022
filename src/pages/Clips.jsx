import { useState, useRef, useCallback } from "react";
import ClipItem from "../components/ClipItem";
import useInfiniteVideoSearch from "../hook/useInfiniteVideoSearch";

function Clips() {
  const [query, setQuery] = useState("월드컵");
  const [pageNumber, setPageNumber] = useState(1);

  const { videos, isLoading, error, hasMorePage } = useInfiniteVideoSearch(
    query,
    pageNumber
  );

  const observer = useRef();
  const lastVideoRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePage) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMorePage]
  );

  return (
    <>
      <ul>
        {videos.map((video, index) => {
          if (videos.length === index + 1) {
            return <ClipItem ref={lastVideoRef} key={index} video={video} />;
          } else {
            return <ClipItem key={index} video={video} />;
          }
        })}
      </ul>
      <div>{isLoading && "Loading"}</div>
      <div>{error && "Error"}</div>
    </>
  );
}

export default Clips;
