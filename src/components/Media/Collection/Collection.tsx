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

  const curr_media_id = media_data.id.split('-')[0];

  return (
    <section className={styles.collections_container}>
      {!isLoading && (
        <div className={styles.parts_container}>
          {data.parts.map((part: any) => {
            return (
              <>
                {curr_media_id != part.id && (
                  <button className={styles.part_container} key={part.id}>
                    {/* TODO: Find to make sure the movie exists in the site */}
                    <img
                      src={`https://image.tmdb.org/t/p/w342${part.poster_path}`}
                      alt={part.original_title}
                    />
                    <p className={styles.part_title}>{part.original_title}</p>
                  </button>
                )}
              </>
            );
          })}
        </div>
      )}
    </section>
  );
}
