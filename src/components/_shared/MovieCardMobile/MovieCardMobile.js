import React from "react";
import "./MovieCardMobile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const MovieCardMobile = (props) => {
  const [movieDetails, setMovieDetails] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [icon, setIcon] = React.useState(false);
  let favoriteList = JSON.parse(localStorage.getItem("favoritesList")) || [];
  React.useEffect(() => {
    setMovieDetails(props.movieListItem);
    if (favoriteList.length > 0) {
      setIcon(favoriteList.filter((e) => e.id === movieDetails.id).length > 0);
    }
  }, [props, movieDetails, favoriteList]);

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
      <div className="movie-card-mobile-container">
        <div className="accordion-item">
          <div
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            <div className="title-content">
              <img
                src={`http://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
                alt="poster"
              />
              <div className="heading-content">
                <h3>{movieDetails.title}</h3>
                <p>{movieDetails.vote_average}</p>
              </div>
            </div>
            <div className="action-container">
              <span className="plus-minus-icon">{isActive ? "-" : "+"}</span>
              <div className="favorite-content">
                {/* <FontAwesomeIcon icon={solidHeart} size="2x" style={{ color: 'red' }}/> */}
                <button onClick={addToFavorites}>
                  {icon ? (
                    <FontAwesomeIcon
                      icon={solidHeart}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                  )}
                </button>
              </div>
            </div>
          </div>
          {isActive && (
            <div className="accordion-content">
              <p>{movieDetails.overview}</p>
              <div className="movie-meta-info-mobile">
                <div className="movie-rating">
                  <h5>Rating</h5>
                  <p>
                    {movieDetails.vote_average} ({movieDetails.vote_count}{" "}
                    votes)
                  </p>
                </div>
                <div className="movie-release">
                  <h5>Release date</h5>
                  <p>{movieDetails.release_date}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieCardMobile;
