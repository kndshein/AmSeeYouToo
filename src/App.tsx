import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './components/MediaListWrapper/MediaListWrapper';
import MediaListWrapper from './components/MediaListWrapper/MediaListWrapper';
import Nav from './components/Nav/Nav';
import About from './components/About/About';

function App() {
  const query_client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const [is_movies_only, setIsMoviesOnly] = useState(false);
  const [is_about_open, setIsAboutOpen] = useState(false);

  return (
    <QueryClientProvider client={query_client}>
      <main className="App">
        {is_about_open && <About setIsAboutOpen={setIsAboutOpen} />}
        <Nav
          is_movies_only={is_movies_only}
          setIsMoviesOnly={setIsMoviesOnly}
          setIsAboutOpen={setIsAboutOpen}
        />
        <MediaListWrapper is_movies_only={is_movies_only} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
