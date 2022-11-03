import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { ITv, IGetTvResult, getAiringTv } from "../../api";
import { makeImagePath } from "../../utils";
import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Info,
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

function AiringToday() {
  const history = useHistory();
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["Tvs", "onAir"],
    getAiringTv
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

  return (
    <>
      <Slider>
        <StandTitles>
          <StandTitle>오늘 방영</StandTitle>
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
    </>
  );
}

export default AiringToday;
