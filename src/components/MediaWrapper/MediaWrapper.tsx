import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MediaType, MediaUiType } from '../../types/Media';
import { HandleToggleType } from '../../types/Toggles';
import Loading from '../Loading/Loading';
import Tag from './Tag/Tag';
import Title from './Title/Title';
import Media from '../Media/Media';
import Backdrop from './Backdrop/Backdrop';
import { useState } from 'react';
import Index from './Index/Index';
import styles from './MediaWrapper.module.scss';
import { LayoutGroup, motion } from 'framer-motion';

type PropTypes = {
  media_data: MediaType;
  is_movies_only: boolean;
  handleToggle: HandleToggleType;
  is_active: boolean;
  idx: number;
};

export default function MediaWrapper({
  media_data,
  is_movies_only,
  handleToggle,
  is_active,
  idx,
}: PropTypes) {
  let query_array = [];
  let url_append = '';
  let url_media_type;
  let media_ui_type: MediaUiType; // To display "Show" instead of "TV"
  const [is_backdrop_loaded, setIsBackdropLoaded] = useState(false);
  // Denotes if curr media is fully expanded or not
  const [is_content_expanded, setIsContentExpanded] = useState(false);

  if (media_data.type == 'tv') {
    query_array = ['show', media_data.id, media_data.season];
    url_append = `,season/${media_data.season}`;
    url_media_type = 'tv';
    media_ui_type = 'show';
  } else {
    query_array = ['movie', media_data.id];
    url_media_type = 'movie';
    media_ui_type = media_data.type;
  }

  let url = `https://api.themoviedb.org/3/${url_media_type}/${
    media_data.id
  }?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=en-US&append_to_response=credits${url_append}`;

  const { isLoading, isError, data } = useQuery({
    queryKey: query_array,
    queryFn: () => axios.get(url).then((res) => res.data),
  });

  return (
    <button
      className={`media ${is_active ? 'active' : ''} ${
        isLoading || !is_backdrop_loaded ? '' : 'ready'
      } ${is_content_expanded ? 'expanded-layout' : ''}`}
      onClick={() => handleToggle(idx)}
      tabIndex={0}
      disabled={isLoading || !is_backdrop_loaded}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={`${styles.content_container} ${
            is_active ? styles.active : ''
          } ${is_content_expanded ? styles.expanded_layout : ''}`}
        >
          <motion.div
            className={styles.content}
            layout
            style={{ borderRadius: '10px' }}
            onLayoutAnimationComplete={() => setIsContentExpanded(is_active)}
            onLayoutAnimationStart={() =>
              setIsContentExpanded((prevState) => prevState && is_active)
            }
          >
            {/* Double loading because the background image only loads if it's rendered */}
            <Backdrop
              data={data}
              is_backdrop_loaded={is_backdrop_loaded}
              setIsBackdropLoaded={setIsBackdropLoaded}
            />
            <Title tmdb_data={data} media_data={media_data} />
            <Tag
              is_movies_only={is_movies_only}
              media_ui_type={media_ui_type}
            />
            <Index idx={idx} />
            <Media tmdb_data={data} media_data={media_data} />
          </motion.div>
        </div>
      )}
    </button>
  );
}
