import React from 'react';
import { Link } from 'react-router-dom';
import './Filmcard.css';

const FilmCard = ({ movie }) => {
  const rating = Math.round(movie.imdbRating / 2); // convertir le score IMDb (sur 10) en score sur 5
  const stars = Array(rating).fill(0).map((_, i) => <span key={i}>⭐</span>); // créer un tableau de stars

  return (
    <div className="container">
      <p className="back-link">
        <Link to="/Searchmovies">Revenir à la recherche de film</Link>
      </p>
      <div className="movie-card">
        <img src={movie.Poster} alt={movie.Title} />
        <h2>{movie.Title} ({movie.Year})</h2>
        <p>{movie.Runtime}</p>
        <p>{movie.Genre}</p>
        <p>{movie.Actors}</p>
        <p>{movie.Plot}</p>
        <p className="star-rating">{stars}</p>
        <p className="box-office">{movie.BoxOffice}</p>
      </div>
    </div>
  );
};

export default FilmCard;

