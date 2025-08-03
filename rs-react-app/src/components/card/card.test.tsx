/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './card';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

describe('Rendering Tests', () => {
  test('Displays item name and description correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card
            id={1}
            name={'bulbasaur'}
            description={'Weight: 69, Height: 7'}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Weight: 69, Height: 7')).toBeInTheDocument();
  });
});
