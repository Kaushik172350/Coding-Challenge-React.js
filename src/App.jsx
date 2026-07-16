import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';

const BookDetails = lazy(() => import('./pages/BookDetails.jsx'));
const Favorites = lazy(() => import('./pages/Favorites.jsx'));

function Loader() {
  return <p className="p-4 text-slate-500">Loading page...</p>;
}

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
