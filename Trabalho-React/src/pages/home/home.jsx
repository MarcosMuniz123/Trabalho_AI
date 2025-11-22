import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './Home.module.css';

const API_URL = 'https://690d0e41a6d92d83e85053b7.mockapi.io/filmes';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        
        setMovies(response.data.reverse()); 
      } catch (err) {
        setError('Não foi possível carregar os filmes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p className={styles.message}>Carregando filmes...</p>;
  }

  if (error) {
    return <p className={styles.messageError}>{error}</p>;
  }

  return (
    <div className={styles.homeContainer}>
      <h1>Filmes do Momento!!!</h1>
      <div className={styles.postsGrid}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className={styles.message}>Nenhum filme cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default Home;