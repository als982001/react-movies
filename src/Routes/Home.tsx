import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { getMovies, IGetMovieResult, getTopMovies } from "../api";
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
import NowPlaying from "./Movies/NowPlaying";
import TopRated from "./Movies/TopRated";
import Upcoming from "./Movies/Upcoming";
import LatestMovie from "./Movies/LatestMovie";
// import { off } from "process";

function Home() {
  const history = useHistory();
  const { data: nowData, isLoading: nowLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
      {nowLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowData?.results[0].backdrop_path || "")}
          >
            <Title>{nowData?.results[0].title}</Title>
            <Overview>{nowData?.results[0].overview}</Overview>
          </Banner>
          <NowPlaying />
          <TopRated />
          <LatestMovie />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
