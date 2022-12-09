import styled from "styled-components";
import { formatDate } from "../../utils/format";
import color from "../../style/color";
import maxLines from "../../style/maxLines";

const DEFAULT_IMG = "https://via.placeholder.com/100x66?text=WorldCup";

function ArticleItem({ article }) {
  const { title, publishedAt, url, urlToImage } = article;
  const headline = title?.split(" - ")[0];
  const source = title?.split(" - ")[1];

  return (
    <Wrapper>
      <div className="leftCol">
        <a href={url} target="_blank">
          <img src={urlToImage || DEFAULT_IMG} />
        </a>
      </div>
      <div className="rightCol">
        <h2 className="headline">
          <a href={url} target="_blank">
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

export default ArticleItem;

const Wrapper = styled.li`
  padding: 15px 0;
  display: grid;
  grid-template-columns: 3fr 7fr;
  text-align: start;

  .leftCol {
    img {
      width: 100px;
      height: 66px;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  .rightCol {
    .headline {
      ${maxLines(2)}
      font-size: 15px;
      margin-bottom: 5px;
    }

    .info {
      font-size: 13px;
      color: ${color.gray};
      letter-spacing: -0.2px;
    }
  }
`;
