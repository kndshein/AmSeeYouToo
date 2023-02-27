import { Fragment } from 'react';
import { MediaType } from '../../types/Media';
import MediaWrapper from '../MediaWrapper/MediaWrapper';
import media_list from '../../assets/media-list.json';
import styles from './MediaList.module.scss';

type PropTypes = {
  movies_only: boolean;
};

let media_list_typed = media_list as Array<MediaType>;

export default function MediaList({ movies_only }: PropTypes) {
  return (
    <div className={styles.media_list}>
      {media_list_typed.map((ele, idx) => {
        return (
          <Fragment
            key={`${ele.id}${
              ele.type == 'tv'
                ? `${ele.season}${ele.epiStart}${ele.epiEnd}`
                : ''
            }`}
          >
            {ele.type == 'movie' && <MediaWrapper media_data={ele} />}
            {!movies_only && (ele.type == 'tv' || ele.type == 'misc') && (
              <MediaWrapper media_data={ele} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
