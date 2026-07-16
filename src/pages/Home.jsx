import { useState } from 'react';
import SearchForm from '../components/SearchForm.jsx';
import BookCard from '../components/BookCard.jsx';
import { searchBooks } from '../services/googleBooksApi.js';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch(fields) {
    setLoading(true);
    setSearchError('');
    setSearched(true);
    try {
      const results = await searchBooks(fields);
      setBooks(results);
    } catch (err) {
      setSearchError('Something went wrong while fetching books. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Search Books</h1>
      <SearchForm onSearch={handleSearch} />

      {loading && <p className="text-slate-500">Loading...</p>}
      {searchError && <p className="text-red-600">{searchError}</p>}
      {!loading && searched && books.length === 0 && !searchError && (
        <p className="text-slate-500">No books found. Try a different search.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
