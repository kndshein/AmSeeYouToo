import { useState } from 'react';
import './App.css';
import './components/MediaWrapper';
import MediaWrapper from './components/MediaWrapper';

function App() {
  const [movies_only, setMoviesOnly] = useState(true);

  return (
    <div className="App">
      <MediaWrapper movies_only={movies_only} />
    </div>
  );
}

export default App;
