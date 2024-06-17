import styles from './LeftContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import Genres from '../Genres/Genres';
import { motion } from 'framer-motion';
import { container } from '../Media';

type PropTypes = {
  tmdb_data: TmdbType;
};

export default function LeftContainer({ tmdb_data }: PropTypes) {
  return (
    <motion.div
      className={styles.container}
      variants={{
        ...container,
        visible: { ...container.visible, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div
        className={styles.poster}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              y: {
                duration: 0.2,
              },
            },
          },
          hidden: {
            opacity: 0,
            y: -100,
            transition: {
              y: {
                duration: 0.2,
              },
            },
          },
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${tmdb_data.poster_path}`}
          alt={tmdb_data.original_title}
        />
      </motion.div>
      <Genres genres={tmdb_data.genres} />
    </motion.div>
  );
}
