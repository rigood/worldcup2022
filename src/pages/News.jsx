import { useState, useEffect } from "react";
import styled from "styled-components";
import color from "../style/color";
import maxLines from "../style/maxLines";
import Button from "../components/Button";
import { ReactComponent as FilterIcon } from "../svg/filter.svg";
import useFetch from "../hook/useFetch";

function formatDate(str) {
  return str.substr(0, 10);
}

const BASE_URL =
  "https://newsapi.org/v2/top-headlines?country=kr&category=sports&pageSize=100";
const API_KEY = "fdeb9675014a4e569ae16e4a53581199";
const DEFAULT_IMG = "https://via.placeholder.com/100x66?text=WorldCup";

function News() {
  const url = `${BASE_URL}&apiKey=${API_KEY}`;
  const [{ data, isLoading, error }, doFetch] = useFetch(url);
  const [index, setIndex] = useState(10);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const articles = data?.articles;

  const filterList = [
    ...new Set(articles?.map((article) => article.title.split(" - ")[1])),
  ];

  const filteredArticles =
    filter === "all"
      ? articles
      : articles?.filter((article) => {
          return article.title.split(" - ")[1] === filter;
        });

  const handleFilterSource = (e) => {
    setFilter(e.target.value);
  };

  const handleLoad = () => {
    setIndex((prev) => prev + 10);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <p className="msg">Loading</p>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <p className="msg">
          에러가 발생했습니다.
          <br />({error})
        </p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FilterContainer>
        <FilterIcon />
        <FilterSelect onChange={handleFilterSource}>
          <option value="all">언론사 전체</option>
          {filterList.map((source, index) => {
            return (
              <option key={index} value={source}>
                {source}
              </option>
            );
          })}
        </FilterSelect>
      </FilterContainer>
      {
        <ArticleList>
          {filteredArticles?.slice(0, index).map((article, index) => {
            const { title, publishedAt, url, urlToImage } = article;
            const headline = title?.split(" - ")[0];
            const source = title?.split(" - ")[1];
            return (
              <ArticleItem key={index}>
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
              </ArticleItem>
            );
          })}
          {filteredArticles?.length === 0 && (
            <p className="msg">관련 기사가 존재하지 않습니다.</p>
          )}
        </ArticleList>
      }
      {index < filteredArticles?.length && (
        <Button onClick={handleLoad} label="더보기" />
      )}
    </Wrapper>
  );
}

export default News;

const Wrapper = styled.div`
  text-align: center;
  .msg {
    white-space: pre-line;
    line-height: 1.5;
  }
`;

const FilterContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterSelect = styled.select`
  margin-left: 2px;
  width: 100px;
  font-size: 15px;
  color: ${color.primary};

  option {
    color: black;
  }
`;

const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .msg {
    margin-top: 20px;
    white-space: pre-line;
    line-height: 1.5;
    text-align: center;
    span {
      font-weight: 700;
      color: ${color.blue};
    }
  }
`;

const ArticleItem = styled.li`
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

// 네이버 뉴스 api 요청시 cors 에러 발생 -> package.json에서 proxy 설정
// 응답은 받아오지만 정상적인 json 파일이 아닌지 Unexpected token 에러 발생

// 카카오 웹문서 인증키 env 환경변수 사용시 에러 발생하여 일반 변수 사용
// 데이터 수신에 문제 없으나 제목에 <b></b> 태그가 포함되어 있어 사용안함

// News api 429 에러 발생(너무 많은 데이터 요청)
// state에 옵셔널 체이닝(? 기호) 적용
