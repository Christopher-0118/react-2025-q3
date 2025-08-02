/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import About from './about-page';

describe('Rendering Tests', () => {
  test('Displays about page', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByTestId('links')).toBeInTheDocument();
  });
});
