import styles from './LeftContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import Genres from '../Genres/Genres';
import { motion } from 'framer-motion';
import { container } from '../Media';
import { MediaType } from '../../../types/Media';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
};

export default function LeftContainer({ tmdb_data, media_data }: PropTypes) {
  let poster_slug = tmdb_data.poster_path;
  if (media_data.type == 'tv') {
    const seasonal_poster =
      tmdb_data[`season/${[media_data.season]}`].poster_path;
    poster_slug = seasonal_poster ?? tmdb_data.poster_path;
  }
  const poster_path = `https://image.tmdb.org/t/p/w342${poster_slug}`;

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
        <img src={poster_path} alt={tmdb_data.original_title} />
      </motion.div>
      <Genres genres={tmdb_data.genres} />
    </motion.div>
  );
}
