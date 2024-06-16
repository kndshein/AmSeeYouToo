import { useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import MediaList from '../MediaList/MediaList';
import styles from './MediaListWrapper.module.scss';

type PropTypes = {
  is_movies_only: boolean;
};

export default function MediaListWrapper({ is_movies_only }: PropTypes) {
  const media_list_ref = useRef<HTMLDivElement>(null);

  const scroll_intensity = 800;
  const handleScroll = (direction: 'right' | 'left') => {
    if (media_list_ref.current) {
      if (direction == 'left') {
        media_list_ref.current.scrollLeft -= scroll_intensity;
      } else if (direction == 'right') {
        media_list_ref.current.scrollLeft += scroll_intensity;
      }
    }
  };

  return (
    <>
      <button
        className={styles.arrow_left}
        onClick={() => handleScroll('left')}
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        className={styles.arrow_right}
        onClick={() => handleScroll('right')}
      >
        <MdKeyboardArrowRight />
      </button>
      <MediaList
        is_movies_only={is_movies_only}
        media_list_ref={media_list_ref}
      />
    </>
  );
}
