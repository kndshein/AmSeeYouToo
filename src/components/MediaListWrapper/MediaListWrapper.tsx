import MediaList from '../MediaList/MediaList';

type PropTypes = {
  movies_only: boolean;
};

export default function MediaListWrapper({ movies_only }: PropTypes) {
  return <MediaList movies_only={movies_only} />;
}
