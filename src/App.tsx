import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './App.css';
import './components/MediaListWrapper';
import MediaListWrapper from './components/MediaListWrapper';

function App() {
  const query_client = new QueryClient();
  const [movies_only, setMoviesOnly] = useState(true);

  return (
    <QueryClientProvider client={query_client}>
      <div className="App">
        <MediaListWrapper movies_only={movies_only} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
