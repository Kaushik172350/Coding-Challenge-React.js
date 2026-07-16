import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.jsx';
import { FavoritesProvider } from '../context/FavoritesContext.jsx';

jest.mock('../services/googleBooksApi.js', () => ({
  searchBooks: jest.fn().mockResolvedValue([
    {
      id: 'abc123',
      volumeInfo: {
        title: 'React Explained',
        authors: ['John Smith'],
        description: 'Learn React Easily',
      },
    },
  ]),
  getBookById: jest.fn().mockResolvedValue({
    id: 'abc123',
    volumeInfo: {
      title: 'React Explained',
      authors: ['John Smith'],
      description: 'Learn React Easily',
      publisher: 'Tech Press',
      publishedDate: '2024',
      pageCount: 200,
      categories: ['Programming'],
    },
  }),
}));

test('navigates from search results to the book details page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/book title/i), { target: { value: 'React' } });
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  const viewDetailsLink = await screen.findByText(/view details/i);
  fireEvent.click(viewDetailsLink);

  await waitFor(() => {
    expect(screen.getByText('Tech Press')).toBeInTheDocument();
  });
});
