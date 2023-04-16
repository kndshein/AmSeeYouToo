import { Fragment, useState, RefObject } from 'react';
import { MediaType } from '../../types/Media';
import { ActiveToggleType, HandleToggleType } from '../../types/Toggles';
import MediaWrapper from '../MediaWrapper/MediaWrapper';
import media_list from '../../assets/media-list.json';
import styles from './MediaList.module.scss';

let media_list_typed = media_list as Array<MediaType>;

type PropTypes = {
  is_movies_only: boolean;
  media_list_ref: RefObject<HTMLDivElement>;
};

export default function MediaList({
  is_movies_only,
  media_list_ref,
}: PropTypes) {
  const [active_toggle, setActiveToggle] = useState<ActiveToggleType>(null);

  const handleToggle: HandleToggleType = (index) => {
    setActiveToggle(index == active_toggle ? null : index);
  };

  const WrapperComponent = (ele: MediaType, idx: number) => {
    return (
      <MediaWrapper
        media_data={ele}
        is_movies_only={is_movies_only}
        handleToggle={handleToggle}
        is_active={active_toggle == idx}
        idx={idx}
      />
    );
  };

  return (
    <div className={styles.media_list} ref={media_list_ref}>
      {media_list_typed.map((ele, idx) => {
        return (
          <Fragment
            key={`${ele.id}${
              ele.type == 'tv'
                ? `${ele.season}${ele.epiStart}${ele.epiEnd}`
                : ''
            }`}
          >
            {ele.type == 'movie' && WrapperComponent(ele, idx)}
            {!is_movies_only &&
              (ele.type == 'tv' || ele.type == 'misc') &&
              WrapperComponent(ele, idx)}
          </Fragment>
        );
      })}
    </div>
  );
}
