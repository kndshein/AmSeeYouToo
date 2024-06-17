import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  HandleToggleType,
  SetCollectionReferences,
} from '../../../types/Toggles';
import { TmdbType } from '../../../types/Tmdb';
import Collections from '../Collections/Collections';
import styles from './CollectionsWrapper.module.scss';
import Loading from '../../Loading/Loading';

type PropTypes = {
  tmdb_data: TmdbType;
  is_active: boolean;
  handleToggle: HandleToggleType;
  setCollectionReferences: SetCollectionReferences;
};

export function CollectionsWrapper({
  tmdb_data,
  is_active,
  handleToggle,
  setCollectionReferences,
}: PropTypes) {
  const { isLoading, data } = useQuery({
    queryKey: ['collection', tmdb_data.belongs_to_collection.id],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/collection/${
            tmdb_data.belongs_to_collection.id
          }?api_key=${import.meta.env.VITE_API_KEY}`
        )
        .then((res) => res.data),
  });

  return (
    <section
      className={`${styles.collections_container} ${
        isLoading ? styles.loading : ''
      }`}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Collections
          collection_data={data}
          tmdb_data={tmdb_data}
          is_active={is_active}
          handleToggle={handleToggle}
          setCollectionReferences={setCollectionReferences}
        />
      )}
    </section>
  );
}
