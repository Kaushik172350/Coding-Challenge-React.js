import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';

function Navbar() {
  const { favorites } = useFavorites();
  return (
    <nav className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between flex-wrap gap-2">
      <Link to="/" className="text-xl font-bold">
        📚 Book Explorer
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-300">
          Search
        </Link>
        <Link to="/favorites" className="hover:text-blue-300">
          Favorites ({favorites.length})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
