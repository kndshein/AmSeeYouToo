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
};

export default function Media({
  tmdb_data,
  media_data,
  is_content_expanded,
}: PropTypes) {
  return (
    <motion.section className={styles.container}>
      <TopContainer
        tmdb_data={tmdb_data}
        media_data={media_data}
        is_content_expanded={is_content_expanded}
      />
      <LeftContainer
        tmdb_data={tmdb_data}
        is_content_expanded={is_content_expanded}
      />
      <RightContainer
        tmdb_data={tmdb_data}
        media_data={media_data}
        is_content_expanded={is_content_expanded}
      />
    </motion.section>
  );
}
