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
      <div className={styles.info_group}>
        <span className={styles.vote}>{Math.round(tmdb_data.vote_average * 10) / 10}</span>
        <span className={styles.dot}>•</span>
        {media_data.type == 'tv' ? (
          <span className="date">{dateCalc(tmdb_data[`season/${media_data.season}`].air_date)}</span>
        ) : (
          <>
            <span className="date">{dateCalc(tmdb_data.release_date)}</span>
            <span className={styles.dot}>•</span>
            <span className="runtime">{runtimeCalc(tmdb_data.runtime)}</span>
          </>
        )}
      </div>
    </section>
  );
}
