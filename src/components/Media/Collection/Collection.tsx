import { useQuery } from '@tanstack/react-query';
import { MediaType } from '../../../types/Media';
import { TmdbType } from '../../../types/Tmdb';
import axios from 'axios';
import styles from './Collection.module.scss';
import media_list from '../../../assets/media-list.json';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
  inView: boolean;
};

function sanitizeMediaId(id: string) {
  return id.split('-')[0];
}

export default function Collection({
  tmdb_data,
  media_data,
  inView,
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
    enabled: inView,
  });

  const curr_media_id = sanitizeMediaId(media_data.id);

  return (
    <section className={styles.collections_container}>
      {!isLoading && (
        <div className={styles.parts_container}>
          {data.parts.map((part: any) => {
            //TODO: Make this more efficient
            const does_media_exist = media_list.find(
              (media) => sanitizeMediaId(media.id) == part.id
            );
            return (
              <>
                {curr_media_id != part.id && does_media_exist && (
                  <button className={styles.part_container} key={part.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w154${part.poster_path}`}
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
