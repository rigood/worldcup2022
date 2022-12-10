import "../../style/skeleton.css";

function NewsSkeleton({ count }) {
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
                gridTemplateColumns: "115px auto",
              }}
            >
              <div>
                <div className="skeleton newsThumbnail" />
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

export default NewsSkeleton;
