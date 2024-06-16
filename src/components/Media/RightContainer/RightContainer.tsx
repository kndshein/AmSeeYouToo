import styles from './RightContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import { MediaType } from '../../../types/Media';
import dateCalc from '../../../utils/date-calc';
import runtimeCalc from '../../../utils/runtime-calc';
import Episodes from '../Episodes/Episodes';
import { container } from '../Media';
import { motion } from 'framer-motion';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
  is_content_expanded: boolean;
};

export default function RightContainer({
  tmdb_data,
  media_data,
  is_content_expanded,
}: PropTypes) {
  const element = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.05,
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
          duration: 0,
        },
      },
    },
  };

  return (
    <motion.section
      className={styles.container}
      variants={{
        ...container,
        visible: { ...container.visible, transition: { staggerChildren: 0.3 } },
      }}
    >
      <motion.section className={styles.info_group} variants={element}>
        <motion.span className={styles.vote} variants={element}>
          {Math.round(tmdb_data.vote_average * 10) / 10}
        </motion.span>
        <motion.span className={styles.dot}>•</motion.span>
        {media_data.type == 'tv' ? (
          <motion.span variants={element}>
            {dateCalc(tmdb_data[`season/${media_data.season}`].air_date)}
          </motion.span>
        ) : (
          <>
            <motion.span variants={element}>
              {dateCalc(tmdb_data.release_date)}
            </motion.span>
            <motion.span className={styles.dot} variants={element}>
              •
            </motion.span>
            <motion.span variants={element}>
              {runtimeCalc(tmdb_data.runtime)}
            </motion.span>
          </>
        )}
      </motion.section>
      <motion.section className={styles.cast} variants={element}>
        {tmdb_data.credits.cast.slice(0, 5).map((actor: any, idx: number) => {
          return (
            <motion.span className={styles.actor} key={idx} variants={element}>
              {actor.name}
            </motion.span>
          );
        })}
      </motion.section>
      <motion.div className={styles.overview} variants={element}>
        {/* Shows w/ singular seasons don't nest their overview info */}
        {media_data.type == 'tv'
          ? tmdb_data[`season/${media_data.season}`].overview ||
            tmdb_data.overview
          : tmdb_data.overview}
      </motion.div>
      {media_data.type == 'tv' && (
        <Episodes tmdb_data={tmdb_data} media_data={media_data} />
      )}
    </motion.section>
  );
}
