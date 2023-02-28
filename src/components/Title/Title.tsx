import styles from './Title.module.scss';

type PropTypes = {
  tmdb_data: any;
};

export default function Title({ tmdb_data }: PropTypes) {
  return (
    <div className={styles.movie_title}>
      <h2>{tmdb_data.original_title}</h2>
    </div>
  );
}
