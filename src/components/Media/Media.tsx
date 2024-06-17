import styles from './Media.module.scss';
import { TmdbType } from '../../types/Tmdb';
import { MediaType } from '../../types/Media';
import TopContainer from './TopContainer/TopContainer';
import LeftContainer from './LeftContainer/LeftContainer';
import RightContainer from './RightContainer/RightContainer';
import { motion } from 'framer-motion';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
  is_content_expanded: boolean;
  inView: boolean;
};

export const container = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

export default function Media({
  tmdb_data,
  media_data,
  is_content_expanded,
  inView,
}: PropTypes) {
  return (
    <motion.section
      className={styles.container}
      animate={is_content_expanded ? 'visible' : 'hidden'}
      variants={{
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.3,
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
      }}
    >
      <TopContainer tmdb_data={tmdb_data} media_data={media_data} />
      <LeftContainer tmdb_data={tmdb_data} />
      <RightContainer
        tmdb_data={tmdb_data}
        media_data={media_data}
        is_content_expanded={is_content_expanded}
        inView={inView}
      />
    </motion.section>
  );
}
