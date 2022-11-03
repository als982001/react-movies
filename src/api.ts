const API_KEY = "cb5ff8ff66f9c05c5e1f5fd2602e7603";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface ITv {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetMovieResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface ILatestTv {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  name: string;
  overview: string | null;
}

export interface ILatestMovie {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  overview: string | null;
}

export function getMovies() {
  // https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getLatestMovie() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// 여기부터는 TV

export function getOnAirTv() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (Response) => Response.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (Response) => Response.json()
  );
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((Response) =>
    Response.json()
  );
}

export function getAiringTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (Response) => Response.json()
  );
}

export function getLatestTv() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getSearchTv() {
  return fetch(`${BASE_PATH}/tv/{tv_id}/keywords?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
