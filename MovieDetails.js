import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import FilmCard from './Filmcard';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=6cda320b`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du film", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (movie === null) {
    return <div>Chargement...</div>;
  }

  return <FilmCard movie={movie} />;
}

export default MovieDetails;
