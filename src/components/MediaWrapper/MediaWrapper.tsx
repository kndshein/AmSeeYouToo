import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MediaType } from '../../types/Media';
import Loading from '../Loading/Loading';
import Movie from '../Movie/Movie';
import Show from '../Show/Show';
import styles from './MediaWrapper.module.scss';

type PropTypes = {
  media_data: MediaType;
};

export default function MediaWrapper({ media_data }: PropTypes) {
  const [is_backdrop_loaded, setIsBackdropLoaded] = useState(false);

  let query_array = [];
  let url = `https://api.themoviedb.org/3/${media_data.type}/${
    media_data.id
  }?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=en-US&append_to_response=credits`;

  if (media_data.type == 'tv') {
    query_array = ['show', media_data.id];
    url += `,season/${media_data.season}`;
  } else {
    query_array = ['movie', media_data.id];
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: query_array,
    queryFn: () => axios.get(url).then((res) => res.data),
  });

  if (isLoading) return <Loading />;

  return (
    <section className={styles.media}>
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
      {media_data.type == 'movie' && (
        <Movie movie_data={media_data} tmdb_data={data} />
      )}
      {media_data.type == 'tv' && (
        <Show show_data={media_data} tmdb_data={data} />
      )}
    </section>
  );
}
