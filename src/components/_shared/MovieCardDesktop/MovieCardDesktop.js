import React from "react";
import "./MovieCardDesktop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { useDispatch } from "react-redux";

const MovieCardDesktop = (props) => {
  const [movieDetails, setMovieDetails] = React.useState([]);
  const [cardFlipped, setCardFlipped] = React.useState(false);

  const [icon, setIcon] = React.useState(false);
  let favoriteList = JSON.parse(localStorage.getItem("favoritesList")) || [];
  React.useEffect(() => {
    setMovieDetails(props.movieListItem);
    if (favoriteList.length > 0) {
      setIcon(favoriteList.filter((e) => e.id === movieDetails.id).length > 0);
    }
  }, [props, movieDetails, favoriteList]);

  const toggleClass = () => {
    setCardFlipped(!cardFlipped);
  };
  const addToFavorites = (e) => {
    e.stopPropagation();
    if (favoriteList.filter((e) => e.id === movieDetails.id).length === 0) {
      var existingEntries = JSON.parse(localStorage.getItem("favoritesList"));
      if (existingEntries == null) existingEntries = [];
      localStorage.setItem("favorite", JSON.stringify(movieDetails));
      existingEntries.push(movieDetails);
      localStorage.setItem("favoritesList", JSON.stringify(existingEntries));
    } else {
      favoriteList = favoriteList.filter((e) => e.id !== movieDetails.id);
      localStorage.setItem("favoritesList", JSON.stringify(favoriteList));
    }
    setIcon(!icon);
  };
  return (
    <React.Fragment>
      <div
        className={`card-container ${cardFlipped ? "is-flipped" : ""}`}
        onClick={toggleClass}
      >
        <div className="card__face card__face--front">
          <div className="poster-container">
            <img
              src={`http://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt="poster"
              width="100%"
            />
          </div>
          <h3>{movieDetails.title}</h3>
          <p>{movieDetails.vote_average}</p>
        </div>
        <div className="card__face card__face--back">
          <div className="movie-header-container">
            <img
              src={`http://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
              alt="poster"
            />
            <div className="heading-content">
              <h4>{movieDetails.title}</h4>
            </div>
          </div>
          <div className="movie-description">
            <p>{movieDetails.overview}</p>
          </div>
          <div className="movie-meta-info">
            <div className="movie-rating">
              <h5>Rating</h5>
              <p>
                {movieDetails.vote_average} ({movieDetails.vote_count} votes)
              </p>
            </div>
            <div className="movie-release">
              <h5>Release date</h5>
              <p>{movieDetails.release_date}</p>
            </div>
          </div>
        </div>
        <div className="favorite-container">
          {/* <FontAwesomeIcon icon={solidHeart} size="2x" style={{ color: 'red' }}/> */}
          <button onClick={addToFavorites}>
            {icon ? (
              <FontAwesomeIcon icon={solidHeart} style={{ color: "red" }} />
            ) : (
              <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
            )}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieCardDesktop;
