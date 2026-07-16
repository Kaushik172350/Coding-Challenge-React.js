import { useFavorites } from '../context/FavoritesContext.jsx';

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p className="p-4 text-slate-500">No favorite books yet. Go add some!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Favorites</h1>
      <ul className="space-y-3">
        {favorites.map((book) => (
          <li key={book.id} className="bg-white shadow rounded-lg p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-800">{book.title}</p>
              <p className="text-sm text-slate-500">{book.authors?.join(', ')}</p>
            </div>
            <button
              onClick={() => removeFavorite(book.id)}
              className="bg-red-500 text-white rounded px-3 py-1.5 text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
