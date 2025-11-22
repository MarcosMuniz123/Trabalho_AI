import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  
  return (
    <div className={styles.card}>
      
      <img 
        src={movie.imagem} 
        alt={`Capa do filme ${movie.titulo}`} 
        className={styles.cardImage} 
      />
      
      <h3 className={styles.title}>{movie.titulo}</h3>
      
      <p className={styles.body}>{movie.sinopse}</p>

    </div>
  );
};

export default MovieCard;