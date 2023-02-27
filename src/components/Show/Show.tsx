import { ShowType } from '../../types/Media';

type PropTypes = {
  show_data: ShowType;
  tmdb_data: object;
};

export default function Show({ show_data }: PropTypes) {
  return (
    <>
      <div>SHOW</div>
    </>
  );
}
