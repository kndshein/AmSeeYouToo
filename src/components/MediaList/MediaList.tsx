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

  const handleToggle: HandleToggleType = (id) => {
    //TODO: Only scroll into view if the element is not in view
    document
      .getElementById(id.toString())
      ?.scrollIntoView({ behavior: 'instant' });
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
