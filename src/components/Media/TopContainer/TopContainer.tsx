import styles from './TopContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import { MediaType } from '../../../types/Media';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
};

export default function TopContainer({ tmdb_data, media_data }: PropTypes) {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>{media_data.type == 'tv' ? tmdb_data.original_name : tmdb_data.original_title}</h2>
      </div>
      <div className={styles.tagline}>
        {media_data.type == 'tv'
          ? `Season ${media_data.season}, Episodes ${media_data.epiStart} - ${media_data.epiEnd}`
          : tmdb_data.tagline}
      </div>
    </section>
  );
}
