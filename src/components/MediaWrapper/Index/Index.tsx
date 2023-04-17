import styles from './Index.module.scss';

interface Props {
  idx: number;
}

function NormalizeNum(num: number) {
  let output: string[] = [];
  const num_string = num.toString();
  for (let i = 0; i < 3 - num_string.length; i++) output.push('0');
  output.push(num_string);
  return output.join('');
}

export default function Index({ idx }: Props) {
  return <span className={styles.index}>{NormalizeNum(idx + 1)}</span>;
}
