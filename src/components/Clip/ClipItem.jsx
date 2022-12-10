import { forwardRef } from "react";
import styled from "styled-components";
import { formatDate, formatSeconds } from "../../utils/format";

const DEFAULT_IMG = "https://via.placeholder.com/100x66?text=WorldCup";

function ClipItem({ video }, ref) {
  const { author, datetime, play_time, thumbnail, title, url } = video;
  return (
    <Wrapper>
      <div className="leftCol">
        <a
          href={url}
          target="_blank"
          title="해당 영상으로 이동합니다."
          rel="noopener noreferrer"
        >
          <Thumbnail bgImg={thumbnail || DEFAULT_IMG}>
            <span className="playtime">{formatSeconds(play_time)}</span>
          </Thumbnail>
        </a>
      </div>
      <div className="rightCol">
        <h2 className="title">
          <a
            href={url}
            target="_blank"
            title="해당 영상으로 이동합니다."
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h2>
        <div className="author">{author}</div>
        <div ref={ref} className="datetime">
          {formatDate(datetime)}
        </div>
      </div>
    </Wrapper>
  );
}

export default forwardRef(ClipItem);

const Wrapper = styled.li`
  padding: 15px 0;
  display: grid;
  grid-template-columns: 135px auto;

  .rightCol {
    .title {
      ${({ theme }) => theme.maxlines(2)};
      font-size: 15px;
      margin-bottom: 2px;
    }

    .author,
    .datetime {
      ${({ theme }) => theme.maxlines(1)};
      font-size: 13px;
      color: ${({ theme }) => theme.color.gray};
      letter-spacing: -0.2px;
    }
  }
`;

const Thumbnail = styled.div`
  width: 120px;
  height: 68px;
  border-radius: 5px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.7)
    ),
    url(${({ bgImg }) => bgImg});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  .playtime {
    position: absolute;
    bottom: 4px;
    right: 8px;
    font-size: 12px;
    font-weight: bold;
    color: white;
  }
`;
