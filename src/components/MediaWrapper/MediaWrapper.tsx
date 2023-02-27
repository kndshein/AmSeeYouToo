import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MediaType, MediaUiType } from '../../types/Media';
import Loading from '../Loading/Loading';
import Movie from '../Movie/Movie';
import Show from '../Show/Show';
import styles from './MediaWrapper.module.scss';

type PropTypes = {
  media_data: MediaType;
  movies_only: boolean;
};

export default function MediaWrapper({ media_data, movies_only }: PropTypes) {
  const [is_backdrop_loaded, setIsBackdropLoaded] = useState(false);

  let query_array = [];
  let url_append;
  let url_media_type;
  let media_ui_type: MediaUiType; // To display "Show" instead of "TV"

  if (media_data.type == 'tv') {
    query_array = ['show', media_data.id];
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

  const LoadedComponent = () => {
    return (
      <>
        {!is_backdrop_loaded && <Loading />}
        <div className={styles.backdrop_wrapper}>
          <img
            className={styles.backdrop}
            src={`https://image.tmdb.org/t/p/w1280${
              data.backdrop_path ? data.backdrop_path : data.poster_path
            }`}
            alt={data.original_title}
            onLoad={() => setIsBackdropLoaded(true)}
          />
        </div>
        <div className={styles.movie_title}>
          <h2>{data.original_title}</h2>
        </div>
        <div
          className={`${styles.type_tag} ${styles[media_ui_type]} ${
            !movies_only ? `${styles.show_type}` : ''
          }`}
        >
          {media_ui_type}
        </div>
        {media_data.type == 'movie' && (
          <Movie movie_data={media_data} tmdb_data={data} />
        )}
        {media_data.type == 'tv' && (
          <Show show_data={media_data} tmdb_data={data} />
        )}
      </>
    );
  };

  return (
    <section className={styles.media}>
      {isLoading ? <Loading /> : LoadedComponent()}
    </section>
  );
}
