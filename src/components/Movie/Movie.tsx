import { MovieType } from '../../types/Media';

type PropTypes = {
  movie_data: MovieType;
  tmdb_data: object;
};

export default function Movie({ movie_data }: PropTypes) {
  return (
    <>
      <div>MOVIE</div>
    </>
  );
}
