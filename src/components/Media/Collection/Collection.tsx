import { useQuery } from '@tanstack/react-query';
import { MediaType } from '../../../types/Media';
import { TmdbType } from '../../../types/Tmdb';
import axios from 'axios';
import styles from './Collection.module.scss';
import media_list from '../../../assets/media-list.json';
import { HandleToggleType } from '../../../types/Toggles';
import { motion } from 'framer-motion';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
  inView: boolean;
  handleToggle: HandleToggleType;
};

function sanitizeMediaId(id: string) {
  return id.split('-')[0];
}

export default function Collection({
  tmdb_data,
  media_data,
  inView,
  handleToggle,
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
        <motion.div
          className={styles.parts_container}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.1 + 0.3 * (tmdb_data.overview.length / 200),
                staggerChildren: 0.2,
              },
            },
            hidden: {
              opacity: 0,
            },
          }}
        >
          {data.parts.map((part: any) => {
            //TODO: Make this more efficient
            const media_id_in_app = media_list.find(
              (media) => sanitizeMediaId(media.id) == part.id
            );
            return (
              <>
                {curr_media_id != part.id && !!media_id_in_app && (
                  <motion.button
                    className={styles.part_container}
                    key={part.id}
                    onClick={() => handleToggle(media_id_in_app.id)}
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          y: {
                            duration: 0.2,
                          },
                        },
                      },
                      hidden: {
                        opacity: 0,
                        y: -50,
                      },
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w154${part.poster_path}`}
                      alt={part.original_title}
                    />
                    <p className={styles.part_title}>{part.original_title}</p>
                  </motion.button>
                )}
              </>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
