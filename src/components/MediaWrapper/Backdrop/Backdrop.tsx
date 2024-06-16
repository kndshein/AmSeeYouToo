import Loading from '../../Loading/Loading';
import styles from './Backdrop.module.scss';
import { motion } from 'framer-motion';

interface Props {
  data: any;
  is_backdrop_loaded: boolean;
  setIsBackdropLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Backdrop({
  data,
  is_backdrop_loaded,
  setIsBackdropLoaded,
}: Props) {
  return (
    <>
      {!is_backdrop_loaded && <Loading />}
      <motion.div layout="preserve-aspect" className={styles.backdrop_wrapper}>
        <div className={styles.screen_overlay}></div>
        <img
          className={styles.backdrop}
          src={`https://image.tmdb.org/t/p/w1280${
            data.backdrop_path ? data.backdrop_path : data.poster_path
          }`}
          alt={data.original_title}
          onLoad={() => setIsBackdropLoaded(true)}
        />
      </motion.div>
    </>
  );
}
