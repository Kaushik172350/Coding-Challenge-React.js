import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../SearchForm.jsx';

test('shows validation error when submitting an empty form', () => {
  const onSearch = jest.fn();
  render(<SearchForm onSearch={onSearch} />);

  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(screen.getByRole('alert')).toHaveTextContent('Please enter at least one search field.');
  expect(onSearch).not.toHaveBeenCalled();
});

test('calls onSearch with entered values when at least one field is filled', () => {
  const onSearch = jest.fn();
  render(<SearchForm onSearch={onSearch} />);

  fireEvent.change(screen.getByLabelText(/book title/i), { target: { value: 'React' } });
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(onSearch).toHaveBeenCalledWith({ title: 'React', author: '', genre: '' });
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
