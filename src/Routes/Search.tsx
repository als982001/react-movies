import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { IGetTvResult, getOnAirTv, getTopRatedTv } from "../api";
import { Loader } from "../Components/styleds";
import { makeImagePath } from "../utils";
import styled from "styled-components";

const SearchDiv = styled.div``;

const SearchCover = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  height: ;
`;

const SearchInfos = styled.div``;

const SearchName = styled.h1``;

const SearchOverview = styled.p``;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: onAirData, isLoading: onAirDataLoading } =
    useQuery<IGetTvResult>("onAir", getOnAirTv);
  const { data: topRatedData, isLoading: topRatedDataLoading } =
    useQuery<IGetTvResult>("topRated", getTopRatedTv);

  let searchedTv =
    keyword && onAirData?.results.find((tv) => tv.name === keyword);

  if (searchedTv === undefined) {
    console.log("못 찾음");
  } else {
    searchedTv =
      keyword && topRatedData?.results.find((tv) => tv.name === keyword);
  }

  return (
    <>
      {searchedTv && (
        <SearchDiv>
          <SearchCover
            bgPhoto={makeImagePath(searchedTv.backdrop_path)}
          ></SearchCover>
          <SearchInfos>
            <SearchName>{searchedTv.name}</SearchName>
            <SearchOverview>{searchedTv.overview}</SearchOverview>
          </SearchInfos>
        </SearchDiv>
      )}
    </>
  );
}
export default Search;
