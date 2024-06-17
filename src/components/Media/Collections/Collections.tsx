import { TmdbType } from '../../../types/Tmdb';
import styles from './Collections.module.scss';
import media_list from '../../../assets/media-list.json';
import {
  CollectionRefType,
  HandleToggleType,
  SetCollectionReferences,
} from '../../../types/Toggles';
import { motion } from 'framer-motion';
import { calculateDelay, sanitizeMediaId } from '../../../utils/utils';
import { useEffect, useState } from 'react';
import Loading from '../../Loading/Loading';

type PropTypes = {
  collection_data: any;
  tmdb_data: TmdbType;
  is_active: boolean;
  handleToggle: HandleToggleType;
  setCollectionReferences: SetCollectionReferences;
};

export default function Collections({
  collection_data,
  tmdb_data,
  is_active,
  handleToggle,
  setCollectionReferences,
}: PropTypes) {
  const [filtered_parts, setFilteredParts] = useState<any[]>([]);
  const [referenced_loading_parts, setReferencedLoadingParts] = useState<
    string[]
  >([]);

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
        setReferencedLoadingParts(collection_parts);
        setFilteredParts(combined_filtered_parts);
      }
    }
  }, [is_active]);

  // Ping to see if the referenced media are ready
  useEffect(() => {
    const interval = setInterval(() => {
      if (is_active && referenced_loading_parts.length) {
        referenced_loading_parts.forEach((part, idx) => {
          const media = document.getElementsByClassName(part);
          if (media[0].classList.contains('ready')) {
            const cloned_referenced_loading_parts = [
              ...referenced_loading_parts,
            ];
            referenced_loading_parts.splice(idx, 1);
            setCollectionReferences(cloned_referenced_loading_parts);
          }
        });
      }
    }, 1000);

    if (!is_active || !referenced_loading_parts.length) clearInterval(interval);

    return () => clearInterval(interval);
  }, [is_active, referenced_loading_parts]);

  return (
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
        const is_ref_media_unready = referenced_loading_parts.includes(
          part.app_media_id
        );
        return (
          <motion.button
            className={`${styles.part_container} ${
              is_ref_media_unready ? styles.disabled : ''
            }`}
            key={part.id}
            onClick={(event) => {
              event.stopPropagation();
              console.log(part.app_media_id);
              handleToggle(part.app_media_id);
            }}
            disabled={is_ref_media_unready}
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
            {is_ref_media_unready && (
              <div className={styles.loading_container}>
                <Loading />
              </div>
            )}
            <p className={styles.part_title}>{part.original_title}</p>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
