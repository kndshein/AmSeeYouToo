import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MovieType } from '../types/Media';

type PropTypes = {
  movie_data: MovieType;
};

export default function Movie({ movie_data }: PropTypes) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['movie', movie_data.id],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_data.id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&append_to_response=credits`
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  return <div>{movie_data.id}</div>;
}
