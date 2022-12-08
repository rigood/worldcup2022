import "../style/skeleton.css";

function PhotoSkeleton({ count }) {
  return (
    <>
      {Array(count)
        .fill(1)
        .map((card, index) => {
          return (
            <div
              key={index}
              style={{
                padding: "15px 0",
                display: "grid",
                gridTemplateColumns: "3fr 7fr",
              }}
            >
              <div>
                <div className="skeleton thumbnail" />
              </div>
              <div>
                <div className="skeleton text" />
                <div className="skeleton text" />
                <div className="skeleton text short" />
              </div>
            </div>
          );
        })}
    </>
  );
}

export default PhotoSkeleton;
