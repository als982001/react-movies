import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";
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
} from "../Components/styleds";
import { boxVariants, infoVariants, rowVariants } from "../Components/variants";

function BigMovieInfo(clickedMovie: IMovie) {
  const { scrollY } = useViewportScroll();
  const history = useHistory();
  const onOverlayClick = () => history.push("/");

  return null;

  /*  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigMovie
        style={{ top: scrollY.get() + 100 }}
        layoutId={clickedMovie.id + ""}
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
  ); */
}

export default BigMovieInfo;
