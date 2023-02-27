import { ShowType } from '../types/Media';

type PropTypes = {
  show_data: ShowType;
};

export default function Show({ show_data }: PropTypes) {
  return <div>{show_data.type}</div>;
}
