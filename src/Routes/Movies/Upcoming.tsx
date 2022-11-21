import { useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { IGetMovieResult, getUpcomingMovies } from "../../api";
import {
  Info,
  Overlay,
  BigMovie,
  BigCover,
  BigTitle,
  BigOverview,
  Slider,
  Row,
  Box,
  StandTitle,
  StandTitles,
  DisplayStand,
  ShowMore,
  BigInfo,
  BigOtherInfos,
  BigOtherInfo,
} from "../../Components/styleds";
import {
  boxVariants,
  infoVariants,
  rowVariants,
} from "../../Components/variants";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../../utils";
import styled from "styled-components";

const offset = 6;

function Upcoming() {
  const history = useHistory();
  const { scrollY } = useViewportScroll();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;

      toggleLeaving();

      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (movieId: number) => history.push(`/movies/${movieId}`);

  const onOverlayClick = () => history.push("/");

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <>
      <Slider>
        <StandTitles>
          <StandTitle>개봉예정작</StandTitle>
          <ShowMore onClick={increaseIndex}>
            <span>더보기</span>
          </ShowMore>
        </StandTitles>
        <DisplayStand>
          <AnimatePresence initial={false}>
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={index}
            >
              {data?.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <Box
                    layoutId={movie.id + ""}
                    key={movie.id}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ Type: "tween" }}
                    onClick={() => onBoxClicked(movie.id)}
                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </DisplayStand>
      </Slider>
      {bigMovieMatch ? (
        <>
          <Overlay onClick={onOverlayClick} />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={bigMovieMatch.params.movieId}
          >
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigInfo>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                  <BigOtherInfos>
                    <BigOtherInfo>
                      언어: {clickedMovie.original_language}
                    </BigOtherInfo>
                    <BigOtherInfo>
                      평점: {clickedMovie.vote_average}
                    </BigOtherInfo>
                  </BigOtherInfos>
                </BigInfo>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </>
  );
}

export default Upcoming;
