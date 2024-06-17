import styles from './TopContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import { MediaType } from '../../../types/Media';
import { motion } from 'framer-motion';
import { container } from '../Media';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
};

export default function TopContainer({ tmdb_data, media_data }: PropTypes) {
  const text = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        x: {
          duration: 0.2,
        },
      },
    },
    hidden: {
      opacity: 0,
      x: -100,
      transition: {
        x: {
          duration: 0.2,
        },
      },
    },
  };

  return (
    <motion.section
      className={styles.container}
      variants={{
        ...container,
        visible: { ...container.visible, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.h2 className={styles.title} variants={text}>
        {media_data.type == 'tv'
          ? tmdb_data.original_name
          : tmdb_data.original_title}
      </motion.h2>
      <motion.p className={styles.tagline} variants={text}>
        {media_data.type == 'tv'
          ? `Season ${media_data.season}, Episodes ${media_data.epiStart} - ${media_data.epiEnd}`
          : tmdb_data.tagline}
      </motion.p>
    </motion.section>
  );
}
