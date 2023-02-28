import styles from './LeftContainer.module.scss';
import { TmdbType } from '../../../types/Tmdb';
import Genres from '../Genres/Genres';

type PropTypes = {
  tmdb_data: TmdbType;
};

export default function LeftContainer({ tmdb_data }: PropTypes) {
  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <img src={`https://image.tmdb.org/t/p/w342${tmdb_data.poster_path}`} alt={tmdb_data.original_title} />
      </div>
      <Genres genres={tmdb_data.genres} />
    </div>
  );
}
