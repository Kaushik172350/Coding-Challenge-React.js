import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Add VITE_GOOGLE_BOOKS_API_KEY to a .env file at the project root to use your
// own quota instead of Google's shared anonymous quota (see README).
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export function buildQuery({ title, author, genre }) {
  const parts = [];
  if (title?.trim()) parts.push(`intitle:${title.trim()}`);
  if (author?.trim()) parts.push(`inauthor:${author.trim()}`);
  if (genre?.trim()) parts.push(`subject:${genre.trim()}`);
  return parts.join('+');
}

export async function searchBooks({ title, author, genre }) {
  const q = buildQuery({ title, author, genre });
  const { data } = await axios.get(BASE_URL, {
    params: { q, ...(API_KEY ? { key: API_KEY } : {}) }
  });
  return data.items || [];
}

export async function getBookById(id) {
  const { data } = await axios.get(`${BASE_URL}/${id}`, {
    params: API_KEY ? { key: API_KEY } : {}
  });
  return data;
}
