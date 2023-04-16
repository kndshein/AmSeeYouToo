import styles from './Nav.module.scss';

type PropTypes = {
  is_movies_only: boolean;
  setIsMoviesOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Nav({
  is_movies_only,
  setIsMoviesOnly,
  setIsAboutOpen,
}: PropTypes) {
  return (
    <nav>
      <button onClick={() => setIsAboutOpen(true)} className={styles.button}>
        About Site
      </button>
      <div className={styles.gif_container}>
        <img
          src="https://media.giphy.com/media/XmppNRlrlu2SA/giphy.gif"
          alt="futuristic blob looking thing animated"
        />
      </div>
      <button
        className={`${is_movies_only ? styles.active : ''} ${styles.button}`}
        onClick={() => {
          is_movies_only ? setIsMoviesOnly(false) : setIsMoviesOnly(true);
        }}
      >
        Movies Only
      </button>
    </nav>
  );
}
