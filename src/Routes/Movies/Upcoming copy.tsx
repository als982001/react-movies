import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getMovies,
  IGetMovieResult,
  getTopMovies,
  getUpcomingMovies,
} from "../../api";
import { makeImagePath } from "../../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
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
  SlideBtn,
  DisplayStand,
} from "../../Components/styleds";
import {
  boxVariants,
  infoVariants,
  rowVariants,
} from "../../Components/variants";

const TestSpan = styled.span`
  font-size: 100px;
  color: red;
`;

const offset = 6;

function Upcoming() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseNowIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();

      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    history.push("/");
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <>
      <Slider>
        <StandTitle onClick={increaseNowIndex}>계봉 예정작</StandTitle>
        <DisplayStand>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
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
                    transition={{ type: "tween" }}
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
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </>
  );
}

export default Upcoming;
