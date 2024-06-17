import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  HandleToggleType,
  SetCollectionReferences,
} from '../../../types/Toggles';
import { MediaType } from '../../../types/Media';
import { TmdbType } from '../../../types/Tmdb';
import Collection from '../Collection/Collection';

type PropTypes = {
  tmdb_data: TmdbType;
  is_active: boolean;
  handleToggle: HandleToggleType;
  setCollectionReferences: SetCollectionReferences;
};

export function CollectionWrapper({
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
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Collection
          collection_data={data}
          tmdb_data={tmdb_data}
          is_active={is_active}
          handleToggle={handleToggle}
          setCollectionReferences={setCollectionReferences}
        />
      )}
    </>
  );
}
