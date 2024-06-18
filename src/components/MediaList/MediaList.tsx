import { Fragment, useState, RefObject } from 'react';
import { MediaType } from '../../types/Media';
import {
  ActiveToggleType,
  CollectionRefType,
  HandleToggleType,
} from '../../types/Toggles';
import MediaWrapper from '../MediaWrapper/MediaWrapper';
import media_list from '../../assets/media-list.json';
import styles from './MediaList.module.scss';
import { isElementInViewport } from '../../utils/utils';

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
  const [collection_references, setCollectionReferences] =
    useState<CollectionRefType>(null);
  const [is_scrolling, setIsScrolling] = useState(false);

  const handleToggle: HandleToggleType = (id) => {
    const ele_active_to_be = document.getElementById(id.toString());

    // If element is not in view, set scrolling state, which is used downstream to prevent fetching
    if (!!ele_active_to_be && !isElementInViewport(ele_active_to_be)) {
      setIsScrolling(true);
      ele_active_to_be.scrollIntoView({ behavior: 'smooth' });
      // Janky solution to prevent from fetching while scrolling
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }

    setActiveToggle(id == active_toggle ? null : id);
    setCollectionReferences(null);
  };

  const WrapperComponent = (ele: MediaType, idx: number) => {
    return (
      <MediaWrapper
        media_data={ele}
        is_movies_only={is_movies_only}
        handleToggle={handleToggle}
        is_active={active_toggle == idx}
        is_scrolling={is_scrolling}
        idx={idx}
        collection_references={collection_references}
        setCollectionReferences={setCollectionReferences}
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
