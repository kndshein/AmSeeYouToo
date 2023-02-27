import { MovieType } from '../types/Media';

type PropTypes = {
  movie_data: MovieType;
};

export default function Movie({ movie_data }: PropTypes) {
  return <div>{movie_data.id}</div>;
}
