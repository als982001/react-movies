import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { ILatestMovie, getLatestMovie } from "../../api";
import { makeImagePath } from "../../utils";
import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Loader,
  LatestDiv,
  YesCover,
  LatestInfo,
  LatestTitle,
  LatestOverview,
  NoCover,
  StandTitle,
} from "../../Components/styleds";
import {
  boxVariants,
  infoVariants,
  rowVariants,
} from "../../Components/variants";

function LatestMovie() {
  const { data, isLoading } = useQuery<ILatestMovie>(
    ["tvs", "latestTv"],
    getLatestMovie
  );

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <StandTitle>가장 최신 영화</StandTitle>
          <LatestDiv>
            {data?.backdrop_path === null ? (
              <NoCover>
                <span>No Cover</span>
              </NoCover>
            ) : (
              <YesCover bgPhoto={makeImagePath(data?.backdrop_path || "")} />
            )}
            <LatestInfo>
              <LatestTitle>{data?.title}</LatestTitle>
              {data?.overview === null || data?.overview == "" ? (
                <LatestOverview>
                  이 작품의 줄거리가 아직 등록되지 않았습니다.
                </LatestOverview>
              ) : (
                <LatestOverview>{data?.overview}</LatestOverview>
              )}
            </LatestInfo>
          </LatestDiv>
        </>
      )}
    </>
  );
}

export default LatestMovie;
