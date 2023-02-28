import styles from './TopContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';

type PropTypes = {
  tmdb_data: TmdbType;
};

export default function TopContainer({ tmdb_data }: PropTypes) {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>{tmdb_data.original_title}</h2>
      </div>
      <div className={styles.tagline}>{tmdb_data.tagline}</div>
    </section>
  );
}
