# 📚 Book Explorer

A React.js application that lets users search books via the Google Books API, view book details, and save favorite books — built with routing, Context API, and performance optimizations.

## Project Setup

```bash
# 1. Install dependencies
npm install

# 2. (Optional but recommended) Add your own Google Books API key
cp .env.example .env
# then open .env and paste your key into VITE_GOOGLE_BOOKS_API_KEY

# 3. Run the app in development mode
npm run dev

# 4. Run tests
npm test

# 5. Build for production
npm run build
```

The dev server runs on the port Vite prints in the terminal (default `http://localhost:5173`).

### Why an API key?

Without a key, requests go through Google's **shared anonymous quota**, which is easily exhausted by other users and returns a `429 RESOURCE_EXHAUSTED` error. Adding your own free key gives the app its own daily quota.

**How to get a key:**
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project (or pick an existing one).
3. Go to **APIs & Services → Library**, search for **"Books API"**, and click **Enable**.
4. Go to **APIs & Services → Credentials → Create Credentials → API key**.
5. Copy the key into your `.env` file:
   ```
   VITE_GOOGLE_BOOKS_API_KEY=your_key_here
   ```
6. Restart `npm run dev` so Vite picks up the new environment variable.

`.env` is already git-ignored, so your key won't be committed.

## Features

- **Search Page (`/`)** — search by Title, Author, and/or Genre/Keyword, calling the Google Books API (`intitle:`, `inauthor:`, `subject:` query operators).
- **Search Results** — responsive card grid (cover image, title, author, short description, "View Details").
- **Book Details Page (`/book/:id`)** — full details (title, authors, description, publisher, published date, page count, categories, thumbnail) with an "Add to Favorites" button.
- **Favorites Page (`/favorites`)** — list of saved favorites with a "Remove" button.
- **Navbar** — shows a live favorites count.
- **Form validation** — shows "Please enter at least one search field." if all three fields are empty.

## Routing Approach

Routing is handled with **React Router DOM** (`BrowserRouter`, `Routes`, `Route`), defined centrally in `App.jsx`:

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Search page |
| `/book/:id` | `BookDetails` | Book details (lazy-loaded) |
| `/favorites` | `Favorites` | Favorite books (lazy-loaded) |

`BookDetails` and `Favorites` are loaded with `React.lazy` + `Suspense` so they're only downloaded when the user navigates to them.

## State Management Approach

Favorites are managed globally with the **Context API** (`src/context/FavoritesContext.jsx`):

- `FavoritesProvider` wraps the app in `main.jsx` and persists favorites to `localStorage` so they survive a page refresh.
- Exposes `favorites`, `addFavorite`, `removeFavorite`, and `isFavorite` via a `useFavorites()` hook, so any component (Navbar, BookDetails, Favorites page) can read/update favorites without prop drilling.
- Local UI state (search inputs, loading/error flags) stays in the component that owns it (`SearchForm`, `Home`, `BookDetails`) via `useState`.

## Performance Optimizations

- **`React.memo()`** on `BookCard` so cards don't re-render unless their own props change.
- **`useMemo()`** in `FavoritesContext` to derive `favoriteIds` from `favorites` only when `favorites` changes, and to memoize the context value so consumers don't re-render unnecessarily.
- **`useCallback()`** for `addFavorite`/`removeFavorite`/`isFavorite` so their identities stay stable across renders.
- **Lazy loading** of the `BookDetails` and `Favorites` routes via `React.lazy` + `Suspense`, reducing the initial bundle size.

## Testing

Tests use **Jest** + **React Testing Library**:

- `src/components/__tests__/SearchForm.test.jsx` — empty-form validation error, and successful submit with a filled field.
- `src/context/__tests__/FavoritesContext.test.jsx` — adding and removing a favorite.
- `src/__tests__/App.test.jsx` — routing from search results to the book details page (Google Books API calls are mocked).

Run with:

```bash
npm test
```

## Tech Stack

| Concern | Choice |
|---|---|
| Build Tool | Vite |
| State Management | Context API |
| Routing | React Router DOM |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Testing | Jest + React Testing Library |

## Folder Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── SearchForm.jsx
│   ├── BookCard.jsx
│   └── __tests__/
│
├── pages/
│   ├── Home.jsx
│   ├── BookDetails.jsx
│   └── Favorites.jsx
│
├── context/
│   ├── FavoritesContext.jsx
│   └── __tests__/
│
├── services/
│   └── googleBooksApi.js
│
├── __tests__/
│   └── App.test.jsx
│
├── App.jsx
├── main.jsx
├── index.css
└── setupTests.js
```

## Suggested Git Commit History

For a clean commit history when submitting, consider committing in this order:

1. `chore: project setup with Vite, Tailwind, Jest`
2. `feat: add routing and navbar`
3. `feat: implement search form with validation`
4. `feat: integrate Google Books API and display search results`
5. `feat: add book details page`
6. `feat: implement favorites with Context API`
7. `perf: add React.memo, useMemo, and lazy loading`
8. `test: add unit tests for search, favorites, and routing`
9. `docs: add README`
