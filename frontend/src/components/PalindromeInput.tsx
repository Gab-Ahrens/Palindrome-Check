import React, { useState } from 'react';

interface Props {
  onCheckSuccess: (entry: { id: number; input_text: string; is_palindrome: boolean }) => void;
}

const API_URL = 'http://localhost:5000/api/check-palindrome';

const PalindromeInput: React.FC<Props> = ({ onCheckSuccess }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_text: input }),
      });

      if (!res.ok) {
        throw new Error('Failed to check palindrome.');
      }

      const data = await res.json();
      onCheckSuccess(data);
      setInput('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Check a Palindrome</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PalindromeInput;
