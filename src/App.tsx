import { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    const response = await axios.get(apiUrl);
  };
  return (
    <div className="App">
      hello world
    </div>
  );
}

export default App;
