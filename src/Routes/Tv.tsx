import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { getOnAirTv, IGetTvResult, ITv } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
} from "../Components/styleds";
import OnAir from "./Tvs/OnAir";
import TopRated from "./Tvs/TopRated";
import PopularTv from "./Tvs/Popular";
import AiringToday from "./Tvs/AiringToday";
import LatestTv from "./Tvs/LatestTv";

function Tv() {
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tvs", "onAir"],
    getOnAirTv
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading,,,</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <OnAir />
          <TopRated />
          <LatestTv />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
