import styles from './Episodes.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import { ShowType } from '../../../types/Media';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: ShowType;
};

export default function Episodes({ tmdb_data, media_data }: PropTypes) {
  return (
    <section className={styles.container}>
      {tmdb_data[`season/${media_data.season}`].episodes
        .slice(media_data.epiStart - 1, media_data.epiEnd)
        .map((ele: any, idx: number) => {
          return (
            <section className={styles.episode_container} key={idx}>
              <div className={styles.still_wrapper}>
                <img
                  className={styles.still}
                  src={`https://image.tmdb.org/t/p/w342${
                    ele.still_path ? ele.still_path : tmdb_data[`season/${media_data.season}`].poster_path
                  }`}
                  alt={tmdb_data.original_name}
                />
              </div>
              <div className={styles.overview_container}>
                <div className={styles.episode}>
                  <span
                    className={styles.number}
                  >{`Season ${ele.season_number}, Episode ${ele.episode_number} - `}</span>
                  <span className={styles.name}>{ele.name}</span>
                </div>
                <p className={styles.overview}>{ele.overview}</p>
              </div>
            </section>
          );
        })}
    </section>
  );
}
