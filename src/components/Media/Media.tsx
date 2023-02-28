import styles from './Media.module.scss';
import { TmdbType } from '../../types/Tmdb';
import TopContainer from './TopContainer/TopContainer';
import LeftContainer from './LeftContainer/LeftContainer';

type PropTypes = {
  tmdb_data: TmdbType;
};

export default function Media({ tmdb_data }: PropTypes) {
  return (
    <section className={styles.container}>
      <TopContainer tmdb_data={tmdb_data} />
      <LeftContainer tmdb_data={tmdb_data} />
      <section className={styles.right_container}></section>
    </section>
  );
}
