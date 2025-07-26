/// <reference types="vitest/globals" />
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './form';

describe('Form Component Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Renders search input and search button', () => {
    render(<Form onSubmit={() => {}} defaultValue={''} />);
    const input = screen.getByTestId('input');
    const button = screen.getByRole('button', { name: /search/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Shows empty input when no saved term exists', () => {
    render(<Form onSubmit={() => {}} defaultValue={''} />);
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('');
  });
});

describe('User Interaction Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Updates input value when user types', () => {
    const onSubmit = vi.fn();
    render(<Form onSubmit={onSubmit} defaultValue={''} />);
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input).toHaveValue('pikachu');
  });

  test('Triggers search callback with correct parameters', () => {
    const onSubmit = vi.fn();
    render(<Form onSubmit={onSubmit} defaultValue={''} />);

    const input = screen.getByTestId('input');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledWith('pikachu');
  });
});
