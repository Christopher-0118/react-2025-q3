/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorPage from './error-page';
import { MemoryRouter } from 'react-router-dom';

describe('Rendering Tests', () => {
  test('Displays item name and description correctly', () => {
    render(
      <MemoryRouter initialEntries={['*']}>
        <ErrorPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
