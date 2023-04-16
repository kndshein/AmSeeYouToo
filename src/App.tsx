import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './components/MediaListWrapper/MediaListWrapper';
import MediaListWrapper from './components/MediaListWrapper/MediaListWrapper';
import Nav from './components/Nav/Nav';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const query_client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const [is_movies_only, setIsMoviesOnly] = useState(true);

  return (
    <QueryClientProvider client={query_client}>
      <main className="App">
        <Nav
          is_movies_only={is_movies_only}
          setIsMoviesOnly={setIsMoviesOnly}
        />
        <MediaListWrapper is_movies_only={is_movies_only} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
