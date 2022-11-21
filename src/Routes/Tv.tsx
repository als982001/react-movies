import { useQuery } from "react-query";
import { useViewportScroll } from "framer-motion";
import { getOnAirTv, IGetTvResult } from "../api";
import { makeImagePath } from "../utils";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
} from "../Components/styleds";
import TopRated from "./Tvs/TopRated";
import PopularTv from "./Tvs/PopularTv";
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
          <TopRated />
          <PopularTv />
          <LatestTv />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
