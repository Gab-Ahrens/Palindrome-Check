import React from 'react';

interface HistoryItem {
  id: number;
  input_text: string;
  is_palindrome: boolean;
}

interface Props {
  history: HistoryItem[];
  onClear: () => void;
}

const HistoryList: React.FC<Props> = ({ history, onClear }) => {
  return (
    <div>
      <h2>History</h2>
      <button onClick={onClear}>Clear History</button>
      <ul>
        {history
          .slice()
          .sort((a, b) => b.id - a.id) // Sort newest first by id
          .map((item) => (
            <li key={item.id}>
              "{item.input_text}" → {item.is_palindrome ? 'Palindrome' : 'Not a palindrome'}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HistoryList;
