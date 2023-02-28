import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './components/MediaListWrapper/MediaListWrapper';
import MediaListWrapper from './components/MediaListWrapper/MediaListWrapper';

function App() {
  const query_client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const [is_movies_only, setMoviesOnly] = useState(false);

  return (
    <QueryClientProvider client={query_client}>
      <div className="App">
        <MediaListWrapper is_movies_only={is_movies_only} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
