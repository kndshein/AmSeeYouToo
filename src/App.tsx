import { useState } from 'react';
import './App.css';
import './components/MediaWrapper';
import MediaWrapper from './components/MediaWrapper';

function App() {
  const [moviesOnly, setMoviesOnly] = useState(true);

  return (
    <div className="App">
      <MediaWrapper moviesOnly={moviesOnly} />
    </div>
  );
}

export default App;
