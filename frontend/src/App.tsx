import React, { useState } from 'react';
import PalindromeInput from './components/PalindromeInput';

function App() {
  const [history, setHistory] = useState<
    { id: number; input_text: string; is_palindrome: boolean }[]
  >([]);

  const handleCheckSuccess = (entry: { id: number; input_text: string; is_palindrome: boolean }) => {
    setHistory((prev) => [entry, ...prev].slice(0, 20)); // Keep only last 20 entries
  };

  return (
    <div>
      <h1>Palindrome Check App</h1>
      <PalindromeInput onCheckSuccess={handleCheckSuccess} />
    </div>
  );
}

export default App;
