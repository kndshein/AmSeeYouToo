import { useQuery } from '@tanstack/react-query';
import { MediaType } from '../../../types/Media';
import { TmdbType } from '../../../types/Tmdb';
import axios from 'axios';
import styles from './Collection.module.scss';

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

  return (
    <section>
      <h3>Collection</h3>
      {!isLoading && (
        <div className={styles.parts_container}>
          {data.parts.map((part: any) => {
            return (
              <div className={styles.part_container}>
                {/* TODO: Find to make sure the movie exists in the site */}
                <img
                  src={`https://image.tmdb.org/t/p/w342${part.poster_path}`}
                  alt={part.original_title}
                />
                {part.original_title}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
