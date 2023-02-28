import { Fragment, useState } from 'react';
import { MediaType } from '../../types/Media';
import { ActiveToggleType, HandleToggleType, HandleKeyDownType } from '../../types/Toggles';
import MediaWrapper from '../MediaWrapper/MediaWrapper';
import media_list from '../../assets/media-list.json';
import styles from './MediaList.module.scss';

let media_list_typed = media_list as Array<MediaType>;

type PropTypes = {
  movies_only: boolean;
};

export default function MediaList({ movies_only }: PropTypes) {
  const [active_toggle, setActiveToggle] = useState<ActiveToggleType>(null);

  const handleToggle: HandleToggleType = (index) => {
    if (index == active_toggle) {
      setActiveToggle(null);
    } else {
      setActiveToggle(index);
    }
    console.log(index);
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
        movies_only={movies_only}
        handleToggle={handleToggle}
        handleKeyDown={handleKeyDown}
        active_toggle={active_toggle}
        idx={idx}
      />
    );
  };

  return (
    <div className={styles.media_list}>
      {media_list_typed.map((ele, idx) => {
        return (
          <Fragment key={`${ele.id}${ele.type == 'tv' ? `${ele.season}${ele.epiStart}${ele.epiEnd}` : ''}`}>
            {ele.type == 'movie' && WrapperComponent(ele, idx)}
            {!movies_only && (ele.type == 'tv' || ele.type == 'misc') && WrapperComponent(ele, idx)}
          </Fragment>
        );
      })}
    </div>
  );
}
