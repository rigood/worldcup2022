import "../../style/skeleton.css";

function PhotoSkeleton({ count }) {
  return (
    <>
      {Array(count)
        .fill(1)
        .map((card, index) => {
          return <div key={index} className="skeleton photoThumbnail" />;
        })}
    </>
  );
}

export default PhotoSkeleton;
