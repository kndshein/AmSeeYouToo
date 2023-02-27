import { Fragment } from 'react';
import Movie from './Movie';
import Show from './Show';
import media_list from '../assets/media-list.json';
import { MediaType } from '../types/Media';

type PropTypes = {
  movies_only: boolean;
};

let media_list_typed = media_list as Array<MediaType>;

export default function MediaList({ movies_only }: PropTypes) {
  return (
    <>
      {media_list_typed.map((ele, idx) => {
        return (
          <Fragment
            key={`${ele.id}${
              ele.type == 'tv'
                ? `${ele.season}${ele.epiStart}${ele.epiEnd}`
                : ''
            }`}
          >
            {ele.type == 'movie' && <Movie movie_data={ele} />}
            {!movies_only && ele.type == 'tv' && <Show show_data={ele} />}
            {!movies_only && ele.type == 'misc' && <Movie movie_data={ele} />}
          </Fragment>
        );
      })}
    </>
  );
}
