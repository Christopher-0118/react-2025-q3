import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import ErrorButton from './error-button';

describe('ErrorButton Tests', () => {
  it('throws error when clicked', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    await userEvent.click(button);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });

  it('renders error boundary fallback after click', async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    await userEvent.click(button);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});
