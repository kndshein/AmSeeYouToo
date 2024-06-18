import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './components/MediaListWrapper/MediaListWrapper';
import MediaListWrapper from './components/MediaListWrapper/MediaListWrapper';
import Nav from './components/Nav/Nav';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [is_DOM_loaded, setIsDOMLoaded] = useState(false);
  const [is_movies_only, setIsMoviesOnly] = useState(true);

  const query_client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  function handleDOMLoad() {
    setIsDOMLoaded(true);
  }

  // https://stackoverflow.com/a/75179787
  // Wait for DOM load so that everything else, including CSS, is loaded first. That way, FOUC doesn't happen, which causes all elements to be in the view, rendering the inView logic useless
  useEffect(() => {
    // Check if the page has already loaded
    if (document.readyState == 'complete') {
      handleDOMLoad();
    } else {
      window.addEventListener('load', handleDOMLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', handleDOMLoad);
    }
  }, []);

  return (
    <QueryClientProvider client={query_client}>
      {is_DOM_loaded && (
        <main className="App">
          <Nav
            is_movies_only={is_movies_only}
            setIsMoviesOnly={setIsMoviesOnly}
          />
          <MediaListWrapper is_movies_only={is_movies_only} />
        </main>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
