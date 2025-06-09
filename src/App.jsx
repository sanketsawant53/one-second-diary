// App.jsx
import { useState, useEffect } from 'react';

const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const App = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('diary');
    return saved ? JSON.parse(saved) : {};
  });
  const [input, setInput] = useState('');
  const today = getToday();

  useEffect(() => {
    localStorage.setItem('diary', JSON.stringify(entries));
  }, [entries]);

  const handleAdd = () => {
    if (!input.trim()) return;
    setEntries({ ...entries, [today]: input });
    setInput('');
  };

  return (
    <div className="min-h-screen bg-beige flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold mb-6">One Second Diary</h1>

      {!entries[today] ? (
        <div className="flex flex-col items-center w-full max-w-md">
          <textarea
            className="w-full p-4 border rounded-md shadow resize-none text-gray-700"
            rows="3"
            maxLength={100}
            placeholder="Write your 1-second memory..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="mt-4 bg-purple-400 text-white px-4 py-2 rounded-full hover:bg-purple-500"
            onClick={handleAdd}
          >
            Save Today's Moment
          </button>
        </div>
      ) : (
        <p className="text-gray-600 italic">You've already added today's memory 💜</p>
      )}

      <div className="mt-10 w-full max-w-md">
        <h2 className="text-lg font-medium mb-3">Your Memories</h2>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(entries).reverse().map(([date, memory]) => (
            <div key={date} className="bg-white rounded shadow p-3">
              <p className="text-xs text-gray-400">{date}</p>
              <p className="mt-1 text-sm">{memory}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
