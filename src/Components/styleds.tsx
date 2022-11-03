import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justfy-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

export const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

export const Slider = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 300px;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  margin: 0 auto;
`;

export const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  baclground-size: cover;
  background-position: center center;
  height: 200px;
  color: red;
  font-size: 60px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;

export const StandTitles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StandTitle = styled.h2`
  font-size: 30px;
  margin-left: 50px;
  margin-bottom: 20px;
  margin-right: 80px;
`;

export const ShowMore = styled.div`
  background-color: #bdbcbc;
  opacity: 0.5;
  height: 45px;
  width: 120px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;

  span {
    font-size: 20px;
    color: black;
    opacity: 1;
  }
`;

export const SlideBtn = styled.div`
  background-color: red;
  width: 40px;
  height: 200px;
  margin: 10px;
`;

export const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 90vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 100;
`;

export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

export const BigInfos = styled.div``;

export const BigInfo = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
`;

export const BigOtherInfos = styled.div``;

/* export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

export const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`; */

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
`;

export const BigOtherInfo = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

export const DisplayStand = styled.div``;

export const LatestDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 90%;
  height: 50vh;
  margin: 0 auto;
`;

export const NoCover = styled.div`
  background-color: #646160;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 48px;
  }
`;

export const YesCover = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 48px;
  }
`;

export const LatestInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const LatestTitle = styled.h3`
  font-size: 48px;
`;

export const LatestOverview = styled.p`
  font-size: 20px;
  text-align: start;
`;
