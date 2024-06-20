import { useState } from 'react';
import styles from './Nav.module.scss';
import About from '../About/About';

type PropTypes = {
  is_movies_only: boolean;
  setIsMoviesOnly: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Nav({ is_movies_only, setIsMoviesOnly }: PropTypes) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <nav>
      <div className={styles.background}></div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`${styles.button} ${styles.about}`}
      >
        About Site
      </button>
      <About isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className={styles.gif_container}>
        <img
          src="https://media.giphy.com/media/XmppNRlrlu2SA/giphy.gif"
          alt="futuristic blob looking thing animated"
        />
      </div>
      <button
        className={`${is_movies_only ? styles.active : ''} ${styles.button} ${
          styles.media_filter
        }`}
        onClick={() => {
          is_movies_only ? setIsMoviesOnly(false) : setIsMoviesOnly(true);
        }}
      >
        Movies Only
      </button>
    </nav>
  );
}
