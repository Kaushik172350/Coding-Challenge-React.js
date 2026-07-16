import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() && !author.trim() && !genre.trim()) {
      setError('Please enter at least one search field.');
      return;
    }
    setError('');
    onSearch({ title, author, genre });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mb-6 grid gap-3 sm:grid-cols-3">
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        aria-label="Book Title"
      />
      <input
        type="text"
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        aria-label="Author Name"
      />
      <input
        type="text"
        placeholder="Genre / Keyword"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        aria-label="Genre / Keyword"
      />
      <button
        type="submit"
        className="sm:col-span-3 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Search
      </button>
      {error && (
        <p role="alert" className="sm:col-span-3 text-red-600 text-sm">
          {error}
        </p>
      )}
    </form>
  );
}

export default SearchForm;
