import Loading from '../../Loading/Loading';
import styles from './Backdrop.module.scss';
import { motion } from 'framer-motion';
import { MediaType } from '../../../types/Media';

interface Props {
  data: any;
  media_data: MediaType;
  is_backdrop_loaded: boolean;
  setIsBackdropLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Backdrop({
  data,
  media_data,
  is_backdrop_loaded,
  setIsBackdropLoaded,
}: Props) {
  let backdrop_path = data.poster_path;
  if (data.backdrop_path) {
    backdrop_path = data.backdrop_path;
    if (media_data.type == 'tv') {
      const alt_backdrop_path = data.images.backdrops[media_data.season - 1];
      backdrop_path = alt_backdrop_path
        ? alt_backdrop_path.file_path
        : data.backdrop_path;
    }
  }
  return (
    <>
      {!is_backdrop_loaded && <Loading />}
      <motion.div layout="preserve-aspect" className={styles.backdrop_wrapper}>
        <div className={styles.screen_overlay}></div>
        <img
          className={styles.backdrop}
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt={data.original_title}
          onLoad={() => setIsBackdropLoaded(true)}
        />
      </motion.div>
    </>
  );
}
