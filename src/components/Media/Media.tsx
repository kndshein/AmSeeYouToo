import styles from './Media.module.scss';
import { TmdbType } from '../../types/Tmdb';
import { MediaType } from '../../types/Media';
import TopContainer from './TopContainer/TopContainer';
import LeftContainer from './LeftContainer/LeftContainer';
import RightContainer from './RightContainer/RightContainer';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
};

export default function Media({ tmdb_data, media_data }: PropTypes) {
  return (
    <section className={styles.container}>
      <TopContainer tmdb_data={tmdb_data} media_data={media_data} />
      <LeftContainer tmdb_data={tmdb_data} />
      <RightContainer tmdb_data={tmdb_data} media_data={media_data} />
    </section>
  );
}
