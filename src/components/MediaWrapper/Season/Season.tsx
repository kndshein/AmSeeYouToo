import { motion } from 'framer-motion';
import { ShowType } from '../../../types/Media';
import styles from './Season.module.scss';

type PropTypes = {
  media_data: ShowType;
};

const nums = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
];

export default function Season({ media_data }: PropTypes) {
  return (
    <motion.div className={styles.season_wrapper} layout="position">
      <p className={styles.season_label}>Season</p>
      <p className={styles.season_num}>{nums[media_data.season - 1]}</p>
    </motion.div>
  );
}
