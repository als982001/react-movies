import { useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { SearchKeyword, ISearchResult, ISearch } from "./api";
import { Loader } from "./Components/styleds";
import { makeImagePath } from "./utils";

const Wrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 200px;
`;

const Span = styled.span`
  font-size: 150px;
  color: pink;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50vw;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const Poster = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  width: 400px;
  height: 200px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

const NoPoster = styled.div`
  background-color: #646160;
  border-radius: 40px;
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 36px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Overview = styled.span``;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<ISearchResult>("search", () =>
    SearchKeyword(keyword)
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Span>Loading...</Span>
      ) : data?.results.length === 0 ? (
        <Span>Not Found</Span>
      ) : (
        <>
          <Results>
            {data?.results.map((searched) => (
              <Result>
                {searched.backdrop_path ? (
                  <Poster
                    bgPhoto={
                      searched.backdrop_path
                        ? makeImagePath(searched.backdrop_path)
                        : ""
                    }
                  />
                ) : (
                  <NoPoster>
                    <span>이미지가 없습니다.</span>
                  </NoPoster>
                )}
                <Info>
                  <Title>
                    {searched.title
                      ? searched.title
                      : "등록된 제목이 없습니다."}
                  </Title>
                  <Overview>
                    {searched.overview || "등록된 요약이 없습니다."}
                  </Overview>
                </Info>
              </Result>
            ))}
          </Results>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
