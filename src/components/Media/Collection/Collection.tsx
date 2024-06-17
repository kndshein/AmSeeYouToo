import { useQuery } from '@tanstack/react-query';
import { MediaType } from '../../../types/Media';
import { TmdbType } from '../../../types/Tmdb';
import axios from 'axios';
import styles from './Collection.module.scss';
import media_list from '../../../assets/media-list.json';
import {
  CollectionRefType,
  HandleToggleType,
  SetCollectionReferences,
} from '../../../types/Toggles';
import { motion } from 'framer-motion';
import { calculateDelay, sanitizeMediaId } from '../../../utils/utils';
import { Fragment, useEffect } from 'react';

type PropTypes = {
  tmdb_data: TmdbType;
  media_data: MediaType;
  is_active: boolean;
  inView: boolean;
  handleToggle: HandleToggleType;
  setCollectionReferences: SetCollectionReferences;
};

export default function Collection({
  tmdb_data,
  media_data,
  is_active,
  handleToggle,
  setCollectionReferences,
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
  });

  const curr_media_id = sanitizeMediaId(media_data.id);
  const app_media_ids = media_list.map((media) => sanitizeMediaId(media.id));

  useEffect(() => {
    if (is_active && !isLoading) {
      const collection_parts: CollectionRefType = [];
      data.parts.forEach((part: any) => {
        const curr_part_id = part.id.toString();
        if (app_media_ids.includes(curr_part_id))
          collection_parts.push(curr_part_id);
      });
      if (collection_parts.length) setCollectionReferences(collection_parts);
    }
  }, [is_active]);

  return (
    <section className={styles.collections_container}>
      {!isLoading && (
        <motion.div
          className={styles.parts_container}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                delayChildren: calculateDelay(tmdb_data.overview),
                staggerChildren: 0.2,
              },
            },
            hidden: {
              opacity: 0,
            },
          }}
        >
          {data.parts.map((part: any) => {
            const app_media_id = media_list.find(
              (media) => sanitizeMediaId(media.id) == part.id
            );

            return (
              <Fragment key={part.id}>
                {curr_media_id != part.id && !!app_media_id && (
                  <motion.button
                    className={styles.part_container}
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log(app_media_id.id);
                      handleToggle(app_media_id.id);
                    }}
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
              </Fragment>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
