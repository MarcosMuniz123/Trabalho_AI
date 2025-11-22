import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      
      <Link to="/" className={styles.logoLink}>
        <img 
          src="/roloDeFilme.png" 
          alt="Logo SerraCine" 
          className={styles.logoIcon}
        />
        <h2>SerraCine</h2>
      </Link>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new-movie" className={styles.newBtn}>
            Novo Filme
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;