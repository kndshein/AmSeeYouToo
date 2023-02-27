import MediaList from './MediaList';
import styles from './MediaListWrapper.module.scss';

type PropTypes = {
  movies_only: boolean;
};

export default function MediaListWrapper({ movies_only }: PropTypes) {
  return <MediaList movies_only={movies_only} />;
}
