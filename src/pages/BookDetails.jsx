import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../services/googleBooksApi.js';
import { useFavorites } from '../context/FavoritesContext.jsx';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getBookById(id)
      .then((data) => {
        if (isMounted) setBook(data);
      })
      .catch(() => {
        if (isMounted) setError('Could not load book details.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <p className="p-4 text-slate-500">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!book) return null;

  const info = book.volumeInfo || {};
  const favorited = isFavorite(book.id);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline">
        &larr; Back to search
      </Link>
      <div className="bg-white shadow rounded-lg p-6 mt-4 flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0 flex justify-center">
          {info.imageLinks?.thumbnail ? (
            <img src={info.imageLinks.thumbnail} alt={info.title} className="h-64 object-contain" />
          ) : (
            <div className="h-64 w-40 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800">{info.title}</h1>
          <p className="text-slate-600 mb-2">{info.authors?.join(', ') || 'Unknown Author'}</p>
          <p className="text-sm text-slate-500 mb-1">
            <strong>Publisher:</strong> {info.publisher || 'N/A'}
          </p>
          <p className="text-sm text-slate-500 mb-1">
            <strong>Published Date:</strong> {info.publishedDate || 'N/A'}
          </p>
          <p className="text-sm text-slate-500 mb-1">
            <strong>Page Count:</strong> {info.pageCount || 'N/A'}
          </p>
          <p className="text-sm text-slate-500 mb-3">
            <strong>Categories:</strong> {info.categories?.join(', ') || 'N/A'}
          </p>
          <p className="text-slate-700 mb-4">{info.description || 'No description available.'}</p>
          <button
            onClick={() => addFavorite({ id: book.id, ...info })}
            disabled={favorited}
            className={`rounded px-4 py-2 text-white ${
              favorited ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {favorited ? 'Added to Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
