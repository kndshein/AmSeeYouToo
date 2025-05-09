import { Fragment, useState, RefObject, useEffect } from 'react';
import { MediaType } from '../../types/Media';
import { ActiveToggleType, HandleToggleType } from '../../types/Toggles';
import MediaWrapper from '../MediaWrapper/MediaWrapper';
import media_list_json from '../../assets/media-list.json';
import styles from './MediaList.module.scss';
import { isElementInViewport } from '../../utils/utils';

type PropTypes = {
  is_movies_only: boolean;
  is_media_reversed: boolean;
  media_list_ref: RefObject<HTMLDivElement>;
};

const media_list = media_list_json as Array<MediaType>;

export default function MediaList({
  is_movies_only,
  is_media_reversed,
  media_list_ref,
}: PropTypes) {
  const [active_toggle, setActiveToggle] = useState<ActiveToggleType>(null);
  // Use `is_navigating` over `is_scrolling` since this is a coded action. Does not take into account of user scrolling
  const [is_navigating, setIsNavigating] = useState(false);

  const handleToggle: HandleToggleType = (id) => {
    const ele_active_to_be = document.getElementById(id.toString());

    // If element is not in view, set scrolling state, which is used downstream to prevent fetching
    if (!!ele_active_to_be && !isElementInViewport(ele_active_to_be)) {
      setIsNavigating(true);
      ele_active_to_be.scrollIntoView({
        // Use 'instant' for Chrome since scrolling on Chromiums seem to be laggy
        behavior: 'smooth',
      });
      // Janky solution to prevent from fetching while scrolling
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
    }

    setActiveToggle(id == active_toggle ? null : id);
  };

  const WrapperComponent = (ele: MediaType, idx: number) => {
    return (
      <MediaWrapper
        media_data={ele}
        is_movies_only={is_movies_only}
        handleToggle={handleToggle}
        is_active={active_toggle == idx}
        is_navigating={is_navigating}
        idx={idx}
      />
    );
  };

  useEffect(() => {
    const curr_ref = media_list_ref.current;
    if (curr_ref) {
      if (is_media_reversed) {
        curr_ref.classList.add(styles.reverse);
      } else {
        curr_ref.classList.remove(styles.reverse);
      }
      // Put a setTimeout so DOM has a chance to update
      setTimeout(() => {
        curr_ref.scrollLeft = curr_ref.scrollWidth * -1;
      }, 1);
    }
  }, [is_media_reversed]);

  return (
    <div className={styles.media_list} ref={media_list_ref}>
      {media_list.map((ele, idx) => {
        return (
          <Fragment
            key={`${ele.id}${
              ele.type == 'tv'
                ? `${ele.season}${ele.epiStart}${ele.epiEnd}`
                : ''
            }`}
          >
            {ele.type == 'movie'
              ? WrapperComponent(ele, idx)
              : !is_movies_only && WrapperComponent(ele, idx)}
          </Fragment>
        );
      })}
    </div>
  );
}
