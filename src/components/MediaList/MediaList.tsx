import { Fragment, useState, RefObject, useRef } from 'react';
import { MediaType } from '../../types/Media';
import { ActiveToggleType, HandleToggleType, HandleKeyDownType } from '../../types/Toggles';
import MediaWrapper from '../MediaWrapper/MediaWrapper';
import media_list from '../../assets/media-list.json';
import styles from './MediaList.module.scss';

let media_list_typed = media_list as Array<MediaType>;

type PropTypes = {
  is_movies_only: boolean;
  media_list_ref: RefObject<HTMLDivElement>;
};

export default function MediaList({ is_movies_only, media_list_ref }: PropTypes) {
  const [active_toggle, setActiveToggle] = useState<ActiveToggleType>(null);
  const idx_arr = useRef<number[]>([]);

  const handleToggle: HandleToggleType = (index) => {
    if (index == active_toggle) {
      setActiveToggle(null);
    } else {
      setActiveToggle(index);
    }
  };

  const handleKeyDown: HandleKeyDownType = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggle(index);
    }
  };

  const WrapperComponent = (ele: MediaType, idx: number) => {
    return (
      <MediaWrapper
        media_data={ele}
        is_movies_only={is_movies_only}
        handleToggle={handleToggle}
        handleKeyDown={handleKeyDown}
        active_toggle={active_toggle}
        idx={idx}
        idx_arr={idx_arr}
      />
    );
  };

  return (
    <div className={`${styles.media_list} ${active_toggle ? styles.active_mode : ''}`} ref={media_list_ref}>
      {media_list_typed.map((ele, idx) => {
        if (is_movies_only && ele.type == 'movie') {
          idx_arr.current.push(idx);
        } else if (!is_movies_only) {
          idx_arr.current.push(idx);
        }
        return (
          <Fragment key={`${ele.id}${ele.type == 'tv' ? `${ele.season}${ele.epiStart}${ele.epiEnd}` : ''}`}>
            {ele.type == 'movie' && WrapperComponent(ele, idx)}
            {!is_movies_only && (ele.type == 'tv' || ele.type == 'misc') && WrapperComponent(ele, idx)}
          </Fragment>
        );
      })}
    </div>
  );
}
