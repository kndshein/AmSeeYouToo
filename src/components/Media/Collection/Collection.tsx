import { MediaType } from '../../../types/Media';
import { TmdbType } from '../../../types/Tmdb';
import styles from './Collection.module.scss';
import media_list from '../../../assets/media-list.json';
import {
  CollectionRefType,
  HandleToggleType,
  SetCollectionReferences,
} from '../../../types/Toggles';
import { motion } from 'framer-motion';
import { calculateDelay, sanitizeMediaId } from '../../../utils/utils';
import { Fragment, useEffect, useState } from 'react';

type PropTypes = {
  collection_data: any;
  tmdb_data: TmdbType;
  is_active: boolean;
  handleToggle: HandleToggleType;
  setCollectionReferences: SetCollectionReferences;
};

export default function Collection({
  collection_data,
  tmdb_data,
  is_active,
  handleToggle,
  setCollectionReferences,
}: PropTypes) {
  const [filtered_parts, setFilteredParts] = useState<any[]>([]);

  useEffect(() => {
    // Only compute the collections if media is selected
    if (is_active) {
      const collection_parts: CollectionRefType = [];
      const combined_filtered_parts = [];
      for (let part of collection_data.parts) {
        const app_media = media_list.find(
          (media) =>
            sanitizeMediaId(media.id) == part.id && tmdb_data.id != part.id
        );
        if (app_media) {
          combined_filtered_parts.push({ ...part, app_media_id: app_media.id });
          collection_parts.push(app_media.id);
        }
        setCollectionReferences(collection_parts);
        setFilteredParts(combined_filtered_parts);
      }
    }
  }, [is_active]);

  return (
    <section className={styles.collections_container}>
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
        {filtered_parts.map((part: any) => {
          return (
            <Fragment key={part.id}>
              <motion.button
                className={styles.part_container}
                onClick={(event) => {
                  event.stopPropagation();
                  console.log(part.app_media_id);
                  handleToggle(part.app_media_id);
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
            </Fragment>
          );
        })}
      </motion.div>
    </section>
  );
}
