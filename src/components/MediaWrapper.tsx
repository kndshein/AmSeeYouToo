import styles from './MediaWrapper.module.scss';

type PropTypes = {
  moviesOnly: boolean;
};
export default function MediaWrapper({ moviesOnly }: PropTypes) {
  return <h2 className={styles.test}>All Media</h2>;
}
