import { forwardRef } from "react";
import styled from "styled-components";
import { translateIntoKorean } from "../../utils/translateIntoKorean";
import { formatDate } from "../../utils/format";

function PhotoItem({ image }, ref) {
  const {
    collection,
    thumbnail_url,
    image_url,
    display_sitename,
    doc_url,
    datetime,
  } = image;

  return (
    <Wrapper>
      <div className="thumbnail">
        <a
          href={image_url}
          target="_blank"
          title="새 탭에서 이미지 열기"
          rel="noopener noreferrer"
        >
          <img
            src={collection === "cafe" ? thumbnail_url : image_url}
            alt="검색 결과 이미지"
          />
        </a>
      </div>
      <div className="source">
        <a
          href={doc_url}
          target="_blank"
          title="해당 사이트로 이동합니다."
          rel="noopener noreferrer"
        >
          [{translateIntoKorean(collection)}] {display_sitename}
        </a>
      </div>
      <div ref={ref} className="datetime">
        {formatDate(datetime)}
      </div>
    </Wrapper>
  );
}

export default forwardRef(PhotoItem);

const Wrapper = styled.li`
  .thumbnail {
    width: 100%;
    margin-bottom: 5px;
    a {
      width: 100%;
      display: block;
      overflow: hidden;
      img {
        width: 100%;
        transition: 0.2s linear;
        cursor: zoom-in;
      }
    }
  }

  .source {
    ${({ theme }) => theme.maxlines(1)};
    font-size: 13px;
  }

  @media (hover: hover) {
    .thumbnail:hover img {
      transform: scale(1.05);
    }

    .source:hover {
      text-decoration: underline;
    }
  }

  .datetime {
    font-size: 13px;
    color: ${({ theme }) => theme.color.gray};
    letter-spacing: -0.2px;
  }
`;
