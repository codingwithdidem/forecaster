import styles from "./Header.module.css";

type HeaderProps = {
  title?: string;
};

const Header = ({ title = "Weather Forecaster" }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>
    </header>
  );
};

export default Header;
