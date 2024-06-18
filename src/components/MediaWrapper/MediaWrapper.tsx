import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MediaType, MediaUiType } from '../../types/Media';
import {
  CollectionRefType,
  HandleToggleType,
  SetCollectionReferences,
} from '../../types/Toggles';
import Loading from '../Loading/Loading';
import Tag from './Tag/Tag';
import Title from './Title/Title';
import Media from '../Media/Media';
import Backdrop from './Backdrop/Backdrop';
import { useState } from 'react';
import Index from './Index/Index';
import styles from './MediaWrapper.module.scss';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Season from './Season/Season';

type PropTypes = {
  media_data: MediaType;
  is_movies_only: boolean;
  handleToggle: HandleToggleType;
  is_active: boolean;
  is_navigating: boolean;
  idx: number;
  collection_references: CollectionRefType;
  setCollectionReferences: SetCollectionReferences;
};

export default function MediaWrapper({
  media_data,
  is_movies_only,
  handleToggle,
  is_active,
  is_navigating,
  idx,
  collection_references,
  setCollectionReferences,
}: PropTypes) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  let query_array = [];
  let url_append = '';
  let url_media_type;
  let media_ui_type: MediaUiType; // To display "Show" instead of "TV"
  const [is_backdrop_loaded, setIsBackdropLoaded] = useState(false);
  // Denotes if curr media is fully expanded or not
  const [is_content_expanded, setIsContentExpanded] = useState(is_active);
  const [is_content_collapsed, setIsContentCollapsed] = useState(!is_active);
  const is_to_prefetch =
    !!collection_references && collection_references.includes(media_data.id);

  if (media_data.type == 'tv') {
    query_array = ['show', media_data.id, media_data.season];
    url_append = `,season/${media_data.season},images`;
    url_media_type = 'tv';
    media_ui_type = 'show';
  } else {
    query_array = ['movie', media_data.id];
    url_append = ',collection';
    url_media_type = 'movie';
    media_ui_type = media_data.type;
  }

  let url = `https://api.themoviedb.org/3/${url_media_type}/${
    media_data.id
  }?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=en-US&include_image_language=null&append_to_response=credits${url_append}`;

  const { isPending, data } = useQuery({
    queryKey: query_array,
    queryFn: () => axios.get(url).then((res) => res.data),
    // If is_active, do it. Otherwise, do it if inView or is_to_prefetch, but not while is_navigating
    enabled: is_active
      ? true
      : is_navigating
      ? false
      : inView || is_to_prefetch,
  });

  return (
    <button
      id={idx.toString()}
      ref={ref}
      className={`${media_data.id} media ${is_active ? 'active' : ''} ${
        isPending || !is_backdrop_loaded ? '' : 'ready'
      } ${is_content_expanded ? 'expanded-layout' : ''} ${
        is_content_collapsed ? 'collapsed-layout' : ''
      }`}
      onClick={() => handleToggle(idx)}
      tabIndex={0}
      disabled={isPending || !is_backdrop_loaded}
    >
      {isPending ? (
        <Loading />
      ) : (
        <div
          className={`${styles.content_container} ${
            is_active ? styles.active : ''
          } ${is_content_expanded ? styles.expanded_layout : ''}`}
        >
          {is_content_expanded && (
            <motion.div
              className={styles.overlay}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.7,
                },
              }}
              initial={{ opacity: 0 }}
            ></motion.div>
          )}
          <motion.div
            className={styles.content}
            layout
            style={{ borderRadius: '10px' }}
            onLayoutAnimationComplete={() => {
              setIsContentExpanded(is_active);
              setIsContentCollapsed(!is_active);
            }}
            onLayoutAnimationStart={() => {
              setIsContentExpanded((prevState) => prevState && is_active);
              setIsContentCollapsed((prevState) => prevState && !is_active);
            }}
            onClick={(event) => {
              if (is_content_expanded) event.stopPropagation();
            }}
            variants={{
              expanded: {
                boxShadow:
                  '0 0 1px white, 0 0 5px 1px rgb(102, 192, 204), 0 0 20px 7px rgb(45, 100, 114)',
                transition: {
                  boxShadow: {
                    delay: 2.5,
                    duration: 0.8,
                  },
                },
              },
              collapsed: {
                boxShadow: 'none',
                transition: {
                  boxShadow: {
                    duration: 0.5,
                  },
                },
              },
            }}
            animate={is_content_expanded ? 'expanded' : 'collapsed'}
          >
            {/* Double loading because the background image only loads if it's rendered */}
            <Backdrop
              data={data}
              media_data={media_data}
              is_backdrop_loaded={is_backdrop_loaded}
              setIsBackdropLoaded={setIsBackdropLoaded}
            />
            <Title tmdb_data={data} media_data={media_data} />
            <Tag
              is_movies_only={is_movies_only}
              media_ui_type={media_ui_type}
            />
            <Index idx={idx} />
            {media_data.type == 'tv' && (
              <Season
                media_data={media_data}
                is_content_collapsed={is_content_collapsed}
              />
            )}
            <Media
              tmdb_data={data}
              media_data={media_data}
              is_active={is_active}
              is_content_expanded={is_content_expanded}
              inView={inView}
              handleToggle={handleToggle}
              setCollectionReferences={setCollectionReferences}
            />
          </motion.div>
        </div>
      )}
    </button>
  );
}
