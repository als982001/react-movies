import { useHistory } from "react-router";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { ITv, IGetTvResult, getOnAirTv, getTopRatedTv } from "../api";
import { Loader } from "../Components/styleds";
import { makeImagePath } from "../utils";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 200px;
`;

const Overlay = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const SearchDiv = styled.div`
  width: 80vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
  margin: 0 auto;
  margin-top: 100px;
  gap: 50px;
  background-color: rgba(239, 243, 247, 0.4);
  border-radius: 40px;
`;

const SearchCover = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 40px;
`;

const SearchInfos = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  gap: 30px;
`;

const SearchName = styled.h1`
  margin: 0 auto;
  font-size: 56px;
`;

const SearchOtherInfo = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 0 50px;
`;

const SearchSmallOtherInfos = styled.div`
  display: flex;
  flex-direction: column;
  jusfify-content: center;
  align-items: center;
`;

const SearchOverview = styled.p`
  font-size: 22px;
`;

const SearchSmallOtherInfo = styled.span`
  font-size: 18px;
  margin: 3px 0;
`;

function SearchProto() {
  const history = useHistory();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: onAirData, isLoading: onAirDataLoading } =
    useQuery<IGetTvResult>("onAir", getOnAirTv);
  const { data: topRatedData, isLoading: topRatedDataLoading } =
    useQuery<IGetTvResult>("topRated", getTopRatedTv);
  const onOverlayClick = () => {
    history.push("/");
  };

  if (keyword === null) {
    return null;
  }

  const lowerKeyword = keyword;

  let searchedTvs: ITv[] = [];

  onAirData?.results.map((tv) => {
    if (tv.name.toLowerCase().includes(lowerKeyword)) {
      searchedTvs.push(tv);
    }
  });
  topRatedData?.results.map((tv) => {
    if (tv.name.toLowerCase().includes(lowerKeyword)) {
      searchedTvs.push(tv);
    }
  });

  /* let searchedTv =
    keyword && onAirData?.results.find((tv) => tv.name.includes(keyword));

  if (searchedTv === undefined) {
    searchedTv =
      keyword && topRatedData?.results.find((tv) => tv.name.includes(keyword));
  } */
  return (
    <Wrapper>
      {searchedTvs.length > 0 ? (
        <Overlay style={{ opacity: 1 }} onClick={onOverlayClick}>
          {searchedTvs.map((searchedTv) => (
            <SearchDiv key={searchedTv.id}>
              <SearchCover
                key={searchedTv.id}
                bgPhoto={makeImagePath(searchedTv.backdrop_path)}
              />
              <SearchInfos>
                <SearchName>{searchedTv.name}</SearchName>
                <SearchOtherInfo>
                  <SearchOverview>{searchedTv.overview}</SearchOverview>
                  <SearchSmallOtherInfos>
                    <SearchSmallOtherInfo>
                      Language: {searchedTv.original_language}
                    </SearchSmallOtherInfo>
                    <SearchSmallOtherInfo>
                      First Air Date: {searchedTv.first_air_date}
                    </SearchSmallOtherInfo>
                    <SearchSmallOtherInfo>
                      Popularity: {searchedTv.popularity}
                    </SearchSmallOtherInfo>
                    <SearchSmallOtherInfo>
                      Vote Average: {searchedTv.vote_average}
                    </SearchSmallOtherInfo>
                  </SearchSmallOtherInfos>
                </SearchOtherInfo>
              </SearchInfos>
            </SearchDiv>
          ))}
        </Overlay>
      ) : null}
    </Wrapper>
  );

  return (
    <>
      {/*       {searchedTv && (
        <Overlay style={{ opacity: 1 }} onClick={onOverlayClick}>
          <SearchDiv>
            <SearchCover bgPhoto={makeImagePath(searchedTv.backdrop_path)} />
            <SearchInfos>
              <SearchName>{searchedTv.name}</SearchName>
              <SearchOtherInfo>
                <SearchOverview>{searchedTv.overview}</SearchOverview>
                <SearchSmallOtherInfos>
                  <SearchSmallOtherInfo>
                    Language: {searchedTv.original_language}
                  </SearchSmallOtherInfo>
                  <SearchSmallOtherInfo>
                    First Air Date: {searchedTv.first_air_date}
                  </SearchSmallOtherInfo>
                  <SearchSmallOtherInfo>
                    Popularity: {searchedTv.popularity}
                  </SearchSmallOtherInfo>
                  <SearchSmallOtherInfo>
                    Vote Average: {searchedTv.vote_average}
                  </SearchSmallOtherInfo>
                </SearchSmallOtherInfos>
              </SearchOtherInfo>
            </SearchInfos>
          </SearchDiv>
        </Overlay>
      )} */}
    </>
  );
}
export default SearchProto;
