import styles from './RightContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import { MediaType } from '../../../types/Media';
import dateCalc from '../../../utils/date-calc';
import runtimeCalc from '../../../utils/runtime-calc';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
};

export default function RightContainer({ tmdb_data, media_data }: PropTypes) {
  return (
    <section className={styles.container}>
      <section className={styles.info_group}>
        <span className={styles.vote}>{Math.round(tmdb_data.vote_average * 10) / 10}</span>
        <span className={styles.dot}>•</span>
        {media_data.type == 'tv' ? (
          <span>{dateCalc(tmdb_data[`season/${media_data.season}`].air_date)}</span>
        ) : (
          <>
            <span>{dateCalc(tmdb_data.release_date)}</span>
            <span className={styles.dot}>•</span>
            <span>{runtimeCalc(tmdb_data.runtime)}</span>
          </>
        )}
      </section>
      <div className={styles.cast}>
        {tmdb_data.credits.cast.slice(0, 5).map((actor: any, idx: number) => {
          return (
            <div className={styles.actor} key={idx}>
              {actor.name}
            </div>
          );
        })}
      </div>
    </section>
  );
}
