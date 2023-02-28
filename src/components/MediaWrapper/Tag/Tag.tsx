import { MediaUiType } from '../../../types/Media';
import styles from './Tag.module.scss';

type PropTypes = {
  movies_only: boolean;
  media_ui_type: MediaUiType;
};

export default function Tag({ movies_only, media_ui_type }: PropTypes) {
  return (
    <div
      className={`${styles.type_tag} ${styles[media_ui_type]} ${!movies_only ? `${styles.show_type}` : ''}`}
    >
      {media_ui_type}
    </div>
  );
}
