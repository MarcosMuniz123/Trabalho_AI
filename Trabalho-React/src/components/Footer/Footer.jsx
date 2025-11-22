import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>&copy; {currentYear} Serratec - Curso Inteligencia Artificial - Todos os direitos reservados. <br></br> <br></br>Este produto usa a API key do TMDB, mas não é endossado ou certificado pelo TMDB.</p>
    </footer>
  );
};

export default Footer;