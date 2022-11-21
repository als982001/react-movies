import { useQuery } from "react-query";
import { useViewportScroll } from "framer-motion";
import { getMovies, IGetMovieResult, getTopMovies } from "../api";
import { makeImagePath } from "../utils";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
} from "../Components/styleds";
import TopRated from "./Movies/TopRated";
import Upcoming from "./Movies/Upcoming";
import LatestMovie from "./Movies/LatestMovie";

function Home() {
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
          <Upcoming />
          <TopRated />
          <LatestMovie />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
