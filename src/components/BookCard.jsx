import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  const info = book.volumeInfo || {};
  const thumbnail = info.imageLinks?.thumbnail;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
      <div className="h-48 bg-slate-100 flex items-center justify-center">
        {thumbnail ? (
          <img src={thumbnail} alt={info.title} className="h-full object-contain" />
        ) : (
          <span className="text-slate-400 text-sm">No Image</span>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-800 line-clamp-2">{info.title || 'Untitled'}</h3>
        <p className="text-sm text-slate-500 mb-1">{info.authors?.join(', ') || 'Unknown Author'}</p>
        <p className="text-sm text-slate-600 flex-1 line-clamp-3">
          {info.description || 'No description available.'}
        </p>
        <Link
          to={`/book/${book.id}`}
          className="mt-2 inline-block text-center bg-blue-600 text-white rounded px-3 py-1.5 text-sm hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

// React.memo used to avoid re-rendering cards that haven't changed
export default React.memo(BookCard);
