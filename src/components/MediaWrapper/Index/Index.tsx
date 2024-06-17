import styles from './Index.module.scss';
import { motion } from 'framer-motion';

interface Props {
  idx: number;
}

function normalizeNum(num: number) {
  let output: string[] = [];
  const num_string = num.toString();
  for (let i = 0; i < 3 - num_string.length; i++) output.push('0');
  output.push(num_string);
  return output.join('');
}

export default function Index({ idx }: Props) {
  return (
    <motion.span className={styles.index} layout="position">
      {normalizeNum(idx + 1)}
    </motion.span>
  );
}
