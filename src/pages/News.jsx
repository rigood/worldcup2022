import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../hook/useFetch";
import NewsFilter from "../components/News/NewsFilter";
import NewsItem from "../components/News/NewsItem";
import NewsSkeleton from "./../components/News/NewsSkeleton";
import ErrorElement from "../components/Common/ErrorElement";
import Button from "./../components/Common/Button";
import TitleContainer from "../components/Common/TitleContainer";
import { faSoccerBall } from "@fortawesome/free-solid-svg-icons";

const BASE_URL =
  "https://newsapi.org/v2/top-headlines?country=kr&category=sports&pageSize=100";
const API_KEY = process.env.REACT_APP_NEWS_KEY;

function News() {
  const url = `${BASE_URL}&apiKey=${API_KEY}`;
  const { data, isLoading, error } = useFetch(url);

  const [index, setIndex] = useState(10);
  const [filter, setFilter] = useState("all");

  const articles = data?.articles;
  const filteredArticles =
    filter === "all"
      ? articles
      : articles?.filter((article) => {
          return article.title.split(" - ")[1] === filter;
        });

  const handleLoad = () => {
    setIndex((prev) => prev + 10);
  };

  return (
    <>
      <TitleFilterContainer>
        <TitleContainer>
          <FontAwesomeIcon icon={faSoccerBall} />
          <h2>스포츠 뉴스</h2>
        </TitleContainer>
        <NewsFilter filter={filter} setFilter={setFilter} articles={articles} />
      </TitleFilterContainer>

      <ArticleList>
        {filteredArticles?.slice(0, index).map((article, index) => {
          return <NewsItem key={index} article={article} />;
        })}
      </ArticleList>

      {isLoading && <NewsSkeleton count={10} />}
      {error && <ErrorElement />}

      {index < filteredArticles?.length && (
        <ButtonWrapper>
          <Button type="button" label="더보기" onClick={handleLoad} />
        </ButtonWrapper>
      )}
    </>
  );
}

export default News;

const TitleFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;

// 네이버 뉴스 api 요청시 cors 에러 발생 -> package.json에서 proxy 설정
// 응답은 받아오지만 정상적인 json 파일이 아닌지 Unexpected token 에러 발생

// 카카오 웹문서 인증키 env 환경변수 사용시 에러 발생하여 일반 변수 사용
// 데이터 수신에 문제 없으나 제목에 <b></b> 태그가 포함되어 있어 사용안함

// News api 429 에러 발생(너무 많은 데이터 요청)
// state에 옵셔널 체이닝(? 기호) 적용
