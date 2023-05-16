import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilmCard from './Filmcard';
import { Link } from 'react-router-dom';
import './Searchmovies.css';

function SearchMovies() {
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const searchMoviesByTitle = async (e) => {
    e.preventDefault();

    const url = `http://www.omdbapi.com/?s=${title}&apikey=6cda320b`;

    try {
      const res = await fetch(url);
      const data  = await res.json();
      setMovies(data.Search);
    } catch(err) {
      console.error(err);
    }
  }

  const loadMovieDetails = (id) => {
    navigate(`/Searchmovies/${id}`);
  }

  return (
    <div className="container">
      <form className="search-form" onSubmit={searchMoviesByTitle}>
        <p className="back-link">
          <Link to="/">Revenir à la page d'accueil</Link>
        </p>
        <label htmlFor="title">Nom du Film</label>
        <input 
          type="text" 
          name="title"
          placeholder="i.e. Jurassic Park"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Chercher par titre</button>
      </form>

      <div className="movie-list">
        {movies && movies.map(movie => (
          <div
            key={movie.imdbID} 
            className="movie-card"
            onClick={() => loadMovieDetails(movie.imdbID)}
          >
            <img 
              src={movie.Poster} 
              alt={movie.Title} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieDetails({ params }) {
  const [movie, setMovie] = useState(null);
  const movieId = params.id;

  useEffect(() => {
    const loadMovieDetails = async () => {
      const url = `http://www.omdbapi.com/?i=${movieId}&apikey=6cda320b`;

      try {
        const res = await fetch(url);
        const data  = await res.json();
        setMovie(data);
      } catch(err) {
        console.error(err);
      }
    }

    loadMovieDetails();
  }, [movieId]);

  if (!movie) {
    return "Chargement...";
  }

  return <FilmCard movie={movie} />;
}

export default SearchMovies;


