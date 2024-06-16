import { MediaType } from '../../../types/Media';
import { TmdbType } from '../../../types/Tmdb';
import styles from './Title.module.scss';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
};

export default function Title({ tmdb_data, media_data }: PropTypes) {
  return (
    <div className={styles.title}>
      <h2>
        {media_data.type == 'tv'
          ? tmdb_data.original_name
          : tmdb_data.original_title}
      </h2>
    </div>
  );
}
