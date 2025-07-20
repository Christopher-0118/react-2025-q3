import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './error-boundary';
import { vi } from 'vitest';

const ThrowAnError = () => {
  throw new Error('Test error from child');
};

describe('Error Catching Tests', () => {
  test('Catches and handles JavaScript errors in child components', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowAnError />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong./i)).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });

  test('Displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowAnError />
      </ErrorBoundary>
    );
    const fallback = screen.getByText(/something went wrong./i);
    expect(fallback).toBeInTheDocument();
  });

  test('Logs error to console', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowAnError />
      </ErrorBoundary>
    );

    expect(consoleErrorMock).toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });
});
