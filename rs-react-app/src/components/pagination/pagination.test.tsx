/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Pagination from './pagination';

const renderWithRouter = (ui: React.ReactNode, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Pagination integration:', () => {
  test('The page number is the same in the URL and the pagination block.', () => {
    renderWithRouter(<Pagination currentPage={3} allPages={6} />, [
      '/some?page=3',
    ]);

    const activePage = screen.getByText('3');
    expect(activePage).toHaveClass('active');
  });

  it('Pagination not showing if only one page', () => {
    renderWithRouter(<Pagination currentPage={1} allPages={1} />);
    const pagination = screen.queryByTestId('pagination');
    expect(pagination).not.toBeInTheDocument();
  });
});
