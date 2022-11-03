import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { ITv, IGetTvResult, getTopRatedTv } from "../../api";
import { makeImagePath } from "../../utils";
import { useState, useEffect } from "react";
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
  StandTitles,
  DisplayStand,
  ShowMore,
} from "../../Components/styleds";
import {
  boxVariants,
  infoVariants,
  rowVariants,
} from "../../Components/variants";

const offset = 6;

function TopRated() {
  const history = useHistory();
  const { scrollY } = useViewportScroll();
  const bigTvMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tvs", "topRated"],
    getTopRatedTv
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;

      toggleLeaving();

      const totalTvs = data.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;

      setIndex((prev) => (prev == maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (tvId: number) => {
    history.push(`/tv/${tvId}`);
  };
  const onOverlayClick = () => history.push("/tv");
  const clickedTv =
    bigTvMatch?.params.tvId &&
    data?.results.find((tv) => tv.id === +bigTvMatch.params.tvId);

  return (
    <>
      <Slider>
        <StandTitles>
          <StandTitle>최고 평점</StandTitle>`
          <ShowMore onClick={increaseIndex}>
            <span>더보기</span>
          </ShowMore>
        </StandTitles>
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
                .map((tv) => (
                  <Box
                    layoutId={tv.id + ""}
                    key={tv.id}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    onClick={() => onBoxClicked(tv.id)}
                    bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{tv.name}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </DisplayStand>
      </Slider>
      {bigTvMatch ? (
        <>
          <Overlay onClick={onOverlayClick} />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={bigTvMatch.params.tvId}
          >
            {clickedTv && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedTv.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>{clickedTv.name}</BigTitle>
                <BigOverview>{clickedTv.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </>
  );
}

export default TopRated;
