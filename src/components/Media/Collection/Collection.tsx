import { useQuery } from '@tanstack/react-query';
import { MediaType } from '../../../types/Media';
import { TmdbType } from '../../../types/Tmdb';
import axios from 'axios';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
  is_content_expanded: boolean;
};

export default function Collection({
  tmdb_data,
  media_data,
  is_content_expanded,
}: PropTypes) {
  const { isLoading, data } = useQuery({
    queryKey: ['collection', tmdb_data.belongs_to_collection.id],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/collection/${
            tmdb_data.belongs_to_collection.id
          }?api_key=${import.meta.env.VITE_API_KEY}`
        )
        .then((res) => res.data),
    enabled: is_content_expanded,
  });

  console.log(data);

  return <div></div>;
}
