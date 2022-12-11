import styled from "styled-components";
import { formatDate } from "../../utils/format";

const DEFAULT_IMG = "https://via.placeholder.com/100x66?text=WorldCup";

function NewsItem({ article }) {
  const { title, publishedAt, url, urlToImage } = article;
  const headline = title?.split(" - ")[0];
  const source = title?.split(" - ")[1];

  return (
    <Wrapper>
      <div className="leftCol">
        <a
          href={url}
          target="_blank"
          title="해당 기사(영상)으로 이동합니다."
          rel="noopener noreferrer"
        >
          <img src={urlToImage || DEFAULT_IMG} alt="기사 썸네일" />
        </a>
      </div>
      <div className="rightCol">
        <h2 className="headline">
          <a
            href={url}
            target="_blank"
            title="해당 기사(영상)으로 이동합니다."
            rel="noopener noreferrer"
          >
            {headline}
          </a>
        </h2>
        <p className="info">
          {source}ㆍ{formatDate(publishedAt)}
        </p>
      </div>
    </Wrapper>
  );
}

export default NewsItem;

const Wrapper = styled.li`
  padding: 15px 0;
  display: grid;
  grid-template-columns: 115px auto;

  .leftCol {
    a {
      img {
        width: 100px;
        height: 66px;
        border-radius: 5px;
      }
    }
  }

  .rightCol {
    .headline {
      ${({ theme }) => theme.maxlines(2)};
      font-size: 15px;
      margin-bottom: 2px;
    }

    .info {
      font-size: 13px;
      color: ${({ theme }) => theme.color.gray};
      letter-spacing: -0.2px;
    }
  }

  @media (hover: hover) {
    .headline:hover {
      text-decoration: underline;
    }
  }
`;
