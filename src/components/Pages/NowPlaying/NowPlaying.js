import React from "react";
import PageTitle from "../../_shared/PageTitle/PageTitle";
import useFetchData from "../../hooks/useFetchData";
import MovieCardDesktop from "../../_shared/MovieCardDesktop/MovieCardDesktop";
import MovieCardMobile from "../../_shared/MovieCardMobile/MovieCardMobile";
import "./NowPlaying.css";

const NowPlaying = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { response, error, loading } = useFetchData("/movies/nowPlaying", {
    query: searchTerm,
  });
  const [movieList, setMovieList] = React.useState([]);
  const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?api_key=3438470ee272e3ad7921f6c925ffb1a5&query=/";
  React.useEffect(() => {
    setMovieList(response);
  }, [response]);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };
  if (error) {
    return <PageTitle>Error</PageTitle>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data);
      });
  };
  return (
    <React.Fragment>
      <div className="header-container">
        <PageTitle>Now Playing</PageTitle>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search for a movie and press Enter"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </div>
      <div className="movie-list-container">
        <div className="movie-list-desktop">
          {movieList?.results.map((item) => {
            return <MovieCardDesktop movieListItem={item} key={item.id} />;
          })}
        </div>
        <div className="movie-list-mobile">
          {movieList?.results.map((item) => {
            return <MovieCardMobile movieListItem={item} key={item.id} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NowPlaying;
