import MediaList from './MediaList';
import styles from './MediaWrapper.module.scss';

type PropTypes = {
  movies_only: boolean;
};

export default function MediaWrapper({ movies_only }: PropTypes) {
  return <MediaList movies_only={movies_only} />;
}
