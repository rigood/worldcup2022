import "../../style/skeleton.css";

function ClipSkeleton({ count }) {
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
                gridTemplateColumns: "135px auto",
              }}
            >
              <div>
                <div className="skeleton videoThumbnail" />
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

export default ClipSkeleton;
