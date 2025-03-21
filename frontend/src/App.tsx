import React, { useState, useEffect } from 'react';
import PalindromeInput from './components/PalindromeInput';
import HistoryList from './components/HistoryList';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [history, setHistory] = useState<
    { id: number; input_text: string; is_palindrome: boolean }[]
  >([]);

  // Loads the history on first render
  useEffect(() => {
    fetch(`${API_URL}/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error('Error fetching history:', err));
  }, []);

  const handleCheckSuccess = (entry: { id: number; input_text: string; is_palindrome: boolean }) => {
    setHistory((prev) => [entry, ...prev].slice(0, 20));
  };

  const handleClearHistory = () => {
    fetch(`${API_URL}/history`, { method: 'DELETE' })
      .then(() => setHistory([]))
      .catch((err) => console.error('Error clearing history:', err));
  };

  return (
    <div>
      <h1>Palindrome Check App</h1>
      <PalindromeInput onCheckSuccess={handleCheckSuccess} />
      <HistoryList history={history} onClear={handleClearHistory} />
    </div>
  );
}

export default App;
