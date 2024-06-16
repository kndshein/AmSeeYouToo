import styles from './TopContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import { MediaType } from '../../../types/Media';
import { motion } from 'framer-motion';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
  is_content_expanded: boolean;
};

export default function TopContainer({
  tmdb_data,
  media_data,
  is_content_expanded,
}: PropTypes) {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'beforeChildren',
        opacity: {
          duration: 0, // To immediately hide when content is no longer expanded
        },
      },
    },
  };

  const item = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        x: {
          duration: 0.1,
        },
      },
    },
    hidden: {
      opacity: 0,
      x: -100,
      transition: {
        x: {
          duration: 0.1,
        },
      },
    },
  };

  return (
    <motion.section
      className={styles.container}
      initial="hidden"
      animate={is_content_expanded ? 'visible' : 'hidden'}
      variants={list}
    >
      <motion.h2 className={styles.title} variants={item}>
        {media_data.type == 'tv'
          ? tmdb_data.original_name
          : tmdb_data.original_title}
      </motion.h2>
      <motion.p className={styles.tagline} variants={item}>
        {media_data.type == 'tv'
          ? `Season ${media_data.season}, Episodes ${media_data.epiStart} - ${media_data.epiEnd}`
          : tmdb_data.tagline}
      </motion.p>
    </motion.section>
  );
}
