import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../FavoritesContext.jsx';

function TestConsumer() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  return (
    <div>
      <span data-testid="count">{favorites.length}</span>
      <button onClick={() => addFavorite({ id: '1', title: 'Book One' })}>Add</button>
      <button onClick={() => removeFavorite('1')}>Remove</button>
    </div>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

test('adds a book to favorites', () => {
  render(
    <FavoritesProvider>
      <TestConsumer />
    </FavoritesProvider>
  );

  fireEvent.click(screen.getByText('Add'));

  expect(screen.getByTestId('count')).toHaveTextContent('1');
});

test('removes a book from favorites', () => {
  render(
    <FavoritesProvider>
      <TestConsumer />
    </FavoritesProvider>
  );

  fireEvent.click(screen.getByText('Add'));
  fireEvent.click(screen.getByText('Remove'));

  expect(screen.getByTestId('count')).toHaveTextContent('0');
});
