import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MediaType, MediaUiType } from '../../types/Media';
import { HandleToggleType } from '../../types/Toggles';
import Loading from '../Loading/Loading';
import Tag from './Tag/Tag';
import Title from './Title/Title';
import Media from '../Media/Media';
import Backdrop from './Backdrop/Backdrop';
import styles from './MediaWrapper.module.scss';

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
      className={`media ${is_active ? 'active' : ''}`}
      onClick={() => handleToggle(idx)}
      tabIndex={0}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Double loading because the background image only loads if it's rendered */}
          <Backdrop data={data} />
          <Title tmdb_data={data} media_data={media_data} />
          <Tag is_movies_only={is_movies_only} media_ui_type={media_ui_type} />
          <Media tmdb_data={data} media_data={media_data} />
        </>
      )}
    </button>
  );
}
