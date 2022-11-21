import { useScroll, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getMovieDetail, IMovie } from "../../api";
import { makeImagePath } from "../../utils";
import {
  Overlay,
  BigMovie,
  BigCover,
  BigTitle,
  BigInfo,
  BigOverview,
  BigOtherInfos,
  BigOtherInfo,
  Loader,
} from "../../Components/styleds";

function BigMovieInfo() {
  const bigMovieId = useRouteMatch<{ movieId: string }>("/movies/:movieId");

  const { data, isLoading } = useQuery<IMovie>("movieDetail", () =>
    getMovieDetail(+bigMovieId.params.movieId)
  );

  const { scrollY } = useViewportScroll();
  const history = useHistory();
  const onOverlayClick = () => history.push("/");

  return (
    <>
      {data ? (
        <>
          <Overlay onClick={onOverlayClick} />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={data.id + ""}
          >
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  data.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigTitle>{data.title}</BigTitle>
            <BigInfo>
              <BigOverview>{data.overview}</BigOverview>
              <BigOtherInfos>
                <BigOtherInfo>언어: {data.original_language}</BigOtherInfo>
                <BigOtherInfo>평점: {data.vote_average}</BigOtherInfo>
              </BigOtherInfos>
            </BigInfo>
          </BigMovie>
        </>
      ) : null}
    </>
  );
}

export default BigMovieInfo;

/*
<>
        <Overlay onClick={onOverlayClick} />
        <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={data.id + ""}>
          <BigCover
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                data.backdrop_path,
                "w500"
              )})`,
            }}
          />
          <BigTitle>{data.title}</BigTitle>
          <BigInfo>
            <BigOverview>{data.overview}</BigOverview>
            <BigOtherInfos>
              <BigOtherInfo>언어: {data.original_language}</BigOtherInfo>
              <BigOtherInfo>평점: {data.vote_average}</BigOtherInfo>
            </BigOtherInfos>
          </BigInfo>
        </BigMovie>
      </>

*/
