import styles from './footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer className={styles.copyright}>Copyright {year}</footer>;
};

export default Footer;
