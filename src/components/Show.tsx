import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ShowType } from '../types/Media';

type PropTypes = {
  show_data: ShowType;
};

export default function Show({ show_data }: PropTypes) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['show', show_data.id],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/${show_data.type}/${
            show_data.id
          }?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&append_to_response=credits,season/${show_data.season}
          }`
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
  return <div>{show_data.id}</div>;
}
